const { intersection, reverse } = require("lodash");
const { deckName } = require("./utils");
const getMatchupInfo = require("./getMatchupInfo");
const getRegionSpread = require("./getRegionSpread");

// const RANK = "master";
const RANK = "overall";
const META_CONSIDERED = 15;
const PREV_INCLUDED_RATIO = 0;
const PREV_FOLDER = "2020-09-20";
const CUR_FOLDER = "2020-09-22";

const LB_OR_AVG = "avg";

const matchupInfo = getMatchupInfo(
  CUR_FOLDER,
  PREV_FOLDER,
  RANK,
  PREV_INCLUDED_RATIO
);
const regionSpread = getRegionSpread(CUR_FOLDER, PREV_FOLDER, RANK);

let entries = Object.entries(regionSpread)
  .sort((a, b) => {
    return b[1] - a[1];
  })
  .slice(0, META_CONSIDERED);

const possibleLineups = [];

for (let i = 0; i < entries.length; i++) {
  for (let j = i + 1; j < entries.length; j++) {
    for (let k = j + 1; k < entries.length; k++) {
      const iRegions = entries[i][0].split("_");
      const jRegions = entries[j][0].split("_");
      const kRegions = entries[k][0].split("_");
      if (
        intersection(iRegions, jRegions).length === 0 &&
        intersection(iRegions, kRegions).length === 0 &&
        intersection(jRegions, kRegions).length === 0
      ) {
        possibleLineups.push([entries[i][0], entries[j][0], entries[k][0]]);
      }
    }
  }
}

// console.dir(possibleLineups);

const calcSpecificOrderWinRate = (lineup, opponent) => {
  const oddsWin00 = matchupInfo[lineup[0]][opponent[0]][LB_OR_AVG];
  const oddsWin10 = matchupInfo[lineup[1]][opponent[0]][LB_OR_AVG];
  const oddsLose10 = 1 - oddsWin10;
  const oddsWin11 = matchupInfo[lineup[1]][opponent[1]][LB_OR_AVG];
  const oddsLose00 = 1 - oddsWin00;
  const oddsWin01 = matchupInfo[lineup[0]][opponent[1]][LB_OR_AVG];

  return (
    oddsWin00 * oddsWin10 + oddsWin00 * oddsLose10 * oddsWin11 + oddsLose00 * oddsWin01 * oddsWin11
  );
}

const calcWinChanceAfterBan = (lineup, opponent) => {
  let lead = null;
  let highestLowestWinRate = 0;
  [lineup, reverse(lineup)].forEach((l) => {
    let lowestWinRate = 1;
    [opponent, reverse(opponent)].forEach((o) => {
      const winRate = calcSpecificOrderWinRate(l, o);
      lowestWinRate = Math.min(lowestWinRate, winRate);
    });
    if (lowestWinRate > highestLowestWinRate) {
      highestLowestWinRate = lowestWinRate;
      lead = l[0];
    }
  });

  return { winRate: highestLowestWinRate, lead }
};

const calcWinChance = (lineup, opponent) => {
  // console.log(lineup, "vs", opponent);
  const possibleL = [
    lineup.slice(1),
    [lineup[0], lineup[2]],
    lineup.slice(0, 2),
  ];
  const possibleO = [
    opponent.slice(1),
    [opponent[0], opponent[2]],
    opponent.slice(0, 2),
  ];

  let winChance = 0;
  let winIndex = -1;
  let lead = null;

  possibleO.forEach((o, index) => {
    let lowestWinChance = 1;
    let lowestLead = null;

    // we want the worst opponent matchups since we assume opponents make good bans
    possibleL.forEach((l) => {
      const { winRate: innerWinChance, lead: innerLead } = calcWinChanceAfterBan(l, o);
      if (innerWinChance < lowestWinChance) {
        lowestWinChance = innerWinChance;
        lowestLead = innerLead;
      }
    });
    if (lowestWinChance > winChance) {
      winChance = lowestWinChance;
      winIndex = index;
      lead = lowestLead;
    }
  });

  return { winChance, ban: opponent[winIndex], lead };
};

const myPossibleLineups = possibleLineups;
// const myPossibleLineups = [["BW_NX", "FR_SI", "DE_IO"]];
const results = myPossibleLineups
  .map((l) => {
    let lowestWinChance = 1;
    let totalWinChance = 0;

    // we want the worst opponent matchups since we assume opponents make good bans
    possibleLineups.forEach((o) => {
      const { winChance, ban, lead } = calcWinChance(l, o);
      console.log(
        (winChance * 100).toFixed(2),
        `${l.map((d) => deckName[d])} vs ${o.map((d) => deckName[d])}`,
        `Ban: ${deckName[ban]}`,
        `Lead: ${deckName[lead]}`
      );
      totalWinChance += winChance;
      if (winChance < lowestWinChance) {
        lowestWinChance = winChance;
      }
    });
    return [l, lowestWinChance, totalWinChance / possibleLineups.length];
  })
  .sort((a, b) => b[1] - a[1]);
results.forEach(([l, low, avg]) => {
  console.log(
    (low * 100).toFixed(2),
    (avg * 100).toFixed(2),
    l.map((d) => deckName[d] || d)
  );
});
