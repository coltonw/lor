const fs = require("fs");
const path = require("path");
const { regionName, allRegions, fileName, lowerBound } = require("./utils");

const bayesianGames = 20;
const baresianAverage = 0.4;

module.exports = (
  curFolder,
  prevFolder,
  rank,
  prevIncludeRatio,
  silent = false
) => {
  const matchupInfo = {};

  let newMatchesCount = 0;

  for (let i = 0; i < allRegions.length; i++) {
    for (let j = i; j < allRegions.length; j++) {
      const current = regionName(allRegions[i], allRegions[j]);
      matchupInfo[current] = matchupInfo[current] || {};

      if (prevFolder) {
        const prevMatchupData = JSON.parse(
          fs.readFileSync(
            path.join(__dirname, prevFolder, fileName(current, rank))
          )
        );
        prevMatchupData.forEach(({ regions, matchesCollected, matchesWin }) => {
          matchupInfo[current][regionName(...regions)] = {
            prevWins: matchesWin,
            prevTotal: matchesCollected,
          };
        });
      }

      const curMatchupData = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, curFolder, fileName(current, rank))
        )
      );
      curMatchupData.forEach(({ regions, matchesCollected, matchesWin }) => {
        const { prevWins, prevTotal } = matchupInfo[current][
          regionName(...regions)
        ] || { prevWins: 0, prevTotal: 0 };
        // Old data is worth PREV_INCLUDED_RATIO times as much as new data
        let newWins = matchesWin - prevWins + prevWins * prevIncludeRatio;
        let newMatches =
          matchesCollected - prevTotal + prevTotal * prevIncludeRatio;

        newMatchesCount += matchesCollected - prevTotal;

        matchupInfo[current][regionName(...regions)] = {
          lb: lowerBound(newWins, newMatches),
          avg: newWins / (newMatches || 1),
          bayesian:
            (newWins + bayesianGames * baresianAverage) /
            (newMatches + bayesianGames),
        };
      });

      if (Object.keys(matchupInfo[current]).length === 0) {
        delete matchupInfo[current];
      } else {
        matchupInfo[current][current] = {
          lb: 0.5,
          avg: 0.5,
          bayesian: 0.5,
        };
      }
    }
  }

  // Divide by two because every matchup is in the data twice, once for each direction
  if (!silent) {
    console.log(`Total new matches played: ${newMatchesCount / 2}\n`);
  }
  return matchupInfo;
};
