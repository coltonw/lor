const Crawler = require("crawler");

// const RANK = "master";
const RANK = "overall";
const META_CONSIDERED = 15;

const lowerBound = (numWins, numGames) => {
  if (numWins === numGames) {
    numGames += 1;
  }
  const winRate = numWins / numGames;
  return Math.max(
    // 1.96 for 95% confidence 1.645 for 90% confidence
    winRate - 1.645 * Math.sqrt((winRate * (1 - winRate)) / numGames),
    0
  );
};

const regionName = (r1, r2) => {
  if (!r2 || r1 === r2) return r1;
  if (r1 < r2) {
    return `${r1}_${r2}`;
  }
  return `${r2}_${r1}`;
};

const deckName = {
  FR_MT: "ASol / Trundle",
  MT_SI: "Nightfall",
  FR_SI: "Endure",
  DE_MT: "Targon / Demacia",
  BW_NX: "Swain OR Pirates",
  DE_IO: "Lulu Demacia",
  IO_MT: "Stun OR Lee Sin",
  BW_DE: "Scout",
  BW_FR: "Sej / Gangplank",
  MT_PZ: "Ez Targon",
  FR_NX: "Swain Behold",
  NX_SI: "Spider Aggro",
  BW_SI: "Deep",
  NX_PZ: "Discard Aggro",
  IO_PZ: "Ez / Karma",
  BW_PZ: "Ez / TF",
};

const allRegions = ["BW", "FR", "IO", "PZ", "MT", "SI", "DE", "NX"];

const c = new Crawler({
  maxConnections: 10,
  jQuery: false,
});

const matchupInfo = {};
let regionSpread = {};

for (let i = 0; i < allRegions.length; i++) {
  for (let j = i; j < allRegions.length; j++) {
    let regionPath = `region=${allRegions[i]}`;
    if (i !== j) {
      regionPath += `&region=${allRegions[j]}`;
    }

    const current = regionName(allRegions[i], allRegions[j]);

    c.queue({
      uri: `https://lor.mobalytics.gg/api/v2/meta/statistics/regions/matchups?${regionPath}&rank=${RANK}`,
      callback: (err, res, done) => {
        if (err) {
          console.log(err);
        } else {
          let body = res.body;

          try {
            body = JSON.parse(body);
            const processMatchupList = ({
              regions,
              matchesCollected,
              matchesWin,
            }) => {
              matchupInfo[current] = matchupInfo[current] || {};
              matchupInfo[current][regionName(...regions)] = {
                lb: lowerBound(matchesWin, matchesCollected),
                avg: matchesWin / matchesCollected,
              };
            };
            body.bestMatchups.forEach(processMatchupList);
            body.worstMatchups.forEach(processMatchupList);
          } catch (e) {
            console.log(e);
            process.exit(1);
          }
        }
        done();
      },
    });
  }
}

// c.queue({
//   uri: `https://lor.mobalytics.gg/api/v2/meta/statistics/regions?rank=${RANK}`,
//   callback: (err, res, done) => {
//     if (err) {
//       console.log(err);
//     } else {
//       let body = res.body;

//       try {
//         body = JSON.parse(body);
//         body.regionsStats.forEach(({ regions, matchesCollected }) => {
//           regionSpread[regionName(...regions)] = matchesCollected;
//         });
//       } catch (e) {
//         console.log(e);
//         process.exit(1);
//       }
//     }
//     done();
//   },
// });

// Tournament region spread from here:
// https://www.reddit.com/r/LoRCompetitive/comments/iq51as/the_tournament_meta_of_patch_18_260820090920/
// regionSpread = {
//   BW_NX: 12,
//   FR_SI: 11,
//   FR_NX: 8,
//   DE_MT: 7,
//   DE_IO: 7,
//   BW_DE: 6,
//   IO_PZ: 6,
//   FR_MT: 5,
//   MT_SI: 5,
//   BW_SI: 4,
// };

c.on("drain", () => {
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
            stringData += `  ${(deckName[popR] || popR).padEnd(18)}${(
              (matchups[popR].lb * 100).toFixed(1) + ""
            ).padStart(4)}%  ${(
              (matchups[popR].avg * 100).toFixed(1) + ""
            ).padStart(4)}%\n`;
          }
        });
      stringData = `${(deckName[r] || r).padEnd(20)}${(
        (totalWinRate * 100).toFixed(1) + ""
      ).padStart(4)}%  ${((totalAvgWinRate * 100).toFixed(1) + "").padStart(
        4
      )}%\n${stringData}`;
      return [r, totalWinRate, stringData];
    })
    .sort((a, b) => b[1] - a[1]);
  console.log(
    "Name".padEnd(20) + "LB%".padStart(5) + "  " + "Avg%".padStart(5) + "\n"
  );
  finalResult.forEach((entry) => {
    console.log(entry[2]);
  });
});
