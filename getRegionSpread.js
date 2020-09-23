const fs = require("fs");
const path = require("path");
const { regionName, fileName } = require("./utils");

module.exports = (curFolder, prevFolder, rank) => {
  const regionSpread = {};
  if (prevFolder) {
    const prevRegionsStats = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, prevFolder, fileName("regions", rank))
      )
    );
    prevRegionsStats.forEach(({ regions, matchesCollected }) => {
      regionSpread[regionName(...regions)] = matchesCollected;
    });
  }
  const curRegionsStats = JSON.parse(
    fs.readFileSync(path.join(__dirname, curFolder, fileName("regions", rank)))
  );
  curRegionsStats.forEach(({ regions, matchesCollected }) => {
    regionSpread[regionName(...regions)] =
      matchesCollected - (regionSpread[regionName(...regions)] || 0);
  });

  return regionSpread;
};
