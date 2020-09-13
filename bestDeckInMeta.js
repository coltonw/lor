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
const FOLDER = "2020-09-11";

const matchupInfo = {};
let regionSpread = {};

for (let i = 0; i < allRegions.length; i++) {
  for (let j = i; j < allRegions.length; j++) {
    let regionPath = `region=${allRegions[i]}`;
    if (i !== j) {
      regionPath += `&region=${allRegions[j]}`;
    }

    const current = regionName(allRegions[i], allRegions[j]);

    const matchupData = JSON.parse(
      fs.readFileSync(path.join(__dirname, FOLDER, fileName(current, RANK)))
    );
    matchupData.forEach(({ regions, matchesCollected, matchesWin }) => {
      matchupInfo[current] = matchupInfo[current] || {};
      matchupInfo[current][regionName(...regions)] = {
        lb: lowerBound(matchesWin, matchesCollected),
        avg: matchesWin / matchesCollected,
      };
    });
  }
}

const regionsStats = JSON.parse(
  fs.readFileSync(path.join(__dirname, FOLDER, fileName("regions", RANK)))
);
regionsStats.forEach(({ regions, matchesCollected }) => {
  regionSpread[regionName(...regions)] = matchesCollected;
});

let entries = Object.entries(regionSpread)
  .sort((a, b) => {
    return b[1] - a[1];
  })
  .slice(0, META_CONSIDERED);

const finalResult = Object.entries(matchupInfo)
  .map(([r, matchups]) => {
    let totalWinRate = 0;
    let totalAvgWinRate = 0;
    const total = entries.reduce(
      (acc, [tr, g]) => acc + (matchups[tr] ? g : 0),
      0
    );
    let stringData = "";
    entries
      .map(([r, g]) => {
        return [r, g / total];
      })
      .forEach(([popR, playRate]) => {
        if (matchups[popR]) {
          totalWinRate += matchups[popR].lb * playRate;
          totalAvgWinRate += matchups[popR].avg * playRate;
          stringData += tableLine(
            popR,
            matchups[popR].lb,
            matchups[popR].avg,
            true
          );
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
