const { deckName, tableLine } = require("./utils");
const getMatchupInfo = require("./getMatchupInfo");
const getRegionSpread = require("./getRegionSpread");

// const RANK = "master";
const RANK = "overall";
const META_CONSIDERED = 7;
const PREV_INCLUDED_RATIO = 0;
const PREV_FOLDER = "2020-09-20";
const CUR_FOLDER = "2020-09-22";

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

const total = entries.reduce((acc, e) => acc + e[1], 0);

console.log("Play rate:");
entries.forEach(([r, g]) => {
  console.log(
    deckName[r].padEnd(20) + (((g / total) * 100).toFixed(1) + "%").padStart(5)
  );
});
console.log("");

const finalResult = Object.entries(matchupInfo)
  .map(([r, matchups]) => {
    let totalWinRate = 0;
    let totalAvgWinRate = 0;
    let totalBayWinRate = 0;

    let stringData = "";
    entries
      .map(([r, g]) => {
        return [r, g / total];
      })
      .forEach(([popR, playRate]) => {
        const { lb, avg, bayesian } = matchups[popR] || { lb: 0.5, avg: 0.5 };
        totalWinRate += lb * playRate;
        totalBayWinRate += bayesian * playRate;
        totalAvgWinRate += avg * playRate;
        if (matchups[popR]) {
          stringData += tableLine(popR, lb, avg, bayesian, true);
        }
      });
    stringData =
      tableLine(r, totalWinRate, totalAvgWinRate, totalBayWinRate, false) +
      stringData;
    return [r, totalWinRate, stringData];
  })
  .sort((a, b) => b[1] - a[1]);
console.log(
  "Name".padEnd(20) +
    "LB%".padStart(5) +
    "  " +
    "Bay%".padStart(5) +
    "  " +
    "Avg%".padStart(5) +
    "\n"
);
finalResult.forEach((entry) => {
  if (regionSpread[entry[0]] > 0.05 * regionSpread[entries[0][0]]) {
    console.log(entry[2]);
  }
});
