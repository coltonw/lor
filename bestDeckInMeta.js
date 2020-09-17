const fs = require("fs");
const path = require("path");
const {
  regionName,
  allRegions,
  fileName,
  lowerBound,
  tableLine,
} = require("./utils");

// const RANK = "master";
const RANK = "overall";
const META_CONSIDERED = 15;
const PREV_INCLUDED_RATIO = 0;
const PREV_FOLDER = "2020-09-11";
const CUR_FOLDER = "2020-09-16";

const matchupInfo = {};
let regionSpread = {};

let newMatchesCount = 0;

for (let i = 0; i < allRegions.length; i++) {
  for (let j = i; j < allRegions.length; j++) {
    const current = regionName(allRegions[i], allRegions[j]);
    matchupInfo[current] = matchupInfo[current] || {};

    const prevMatchupData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, PREV_FOLDER, fileName(current, RANK))
      )
    );
    prevMatchupData.forEach(({ regions, matchesCollected, matchesWin }) => {
      matchupInfo[current][regionName(...regions)] = {
        prevWins: matchesWin,
        prevTotal: matchesCollected,
      };
    });

    const curMatchupData = JSON.parse(
      fs.readFileSync(path.join(__dirname, CUR_FOLDER, fileName(current, RANK)))
    );
    curMatchupData.forEach(({ regions, matchesCollected, matchesWin }) => {
      const { prevWins, prevTotal } = matchupInfo[current][
        regionName(...regions)
      ] || { prevWins: 0, prevTotal: 0 };
      // Old data is worth PREV_INCLUDED_RATIO times as much as new data
      let newWins = matchesWin - prevWins + prevWins * PREV_INCLUDED_RATIO;
      let newMatches =
        matchesCollected - prevTotal + prevTotal * PREV_INCLUDED_RATIO;

      newMatchesCount += matchesCollected - prevTotal;

      matchupInfo[current][regionName(...regions)] = {
        lb: lowerBound(newWins, newMatches),
        avg: newWins / (newMatches || 1),
      };
    });

    if (Object.keys(matchupInfo[current]).length === 0) {
      delete matchupInfo[current];
    }
  }
}

// Divide by two because every matchup is in the data twice, once for each direction
console.log(`Total new matches played: ${newMatchesCount / 2}\n`);

const prevRegionsStats = JSON.parse(
  fs.readFileSync(path.join(__dirname, PREV_FOLDER, fileName("regions", RANK)))
);
prevRegionsStats.forEach(({ regions, matchesCollected }) => {
  regionSpread[regionName(...regions)] = matchesCollected;
});
const curRegionsStats = JSON.parse(
  fs.readFileSync(path.join(__dirname, CUR_FOLDER, fileName("regions", RANK)))
);
curRegionsStats.forEach(({ regions, matchesCollected }) => {
  regionSpread[regionName(...regions)] =
    matchesCollected - regionSpread[regionName(...regions)];
});

let entries = Object.entries(regionSpread)
  .sort((a, b) => {
    return b[1] - a[1];
  })
  .slice(0, META_CONSIDERED);

const total = entries.reduce((acc, [_, g]) => acc + g, 0);

const finalResult = Object.entries(matchupInfo)
  .map(([r, matchups]) => {
    let totalWinRate = 0;
    let totalAvgWinRate = 0;

    let stringData = "";
    entries
      .map(([r, g]) => {
        return [r, g / total];
      })
      .forEach(([popR, playRate]) => {
        const { lb, avg } = matchups[popR] || { lb: 0.5, avg: 0.5 };
        totalWinRate += lb * playRate;
        totalAvgWinRate += avg * playRate;
        if (matchups[popR]) {
          stringData += tableLine(popR, lb, avg, true);
        }
      });
    stringData =
      tableLine(r, totalWinRate, totalAvgWinRate, false) + stringData;
    return [r, totalWinRate, stringData];
  })
  .sort((a, b) => b[1] - a[1]);
console.log(
  "Name".padEnd(20) + "LB%".padStart(5) + "  " + "Avg%".padStart(5) + "\n"
);
finalResult.forEach((entry) => {
  console.log(entry[2]);
});
