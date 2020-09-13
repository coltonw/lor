const Crawler = require("crawler");
const fs = require("fs");
const path = require("path");
const { allRegions, regionName, fileName } = require("./utils");

const ranks = ["overall", "master"];

const c = new Crawler({
  maxConnections: 10,
  jQuery: false,
});

const stats = {};
let patchInfo = {};

c.queue({
  uri: `https://lor.mobalytics.gg/api/v2/meta/patch-info`,
  callback: (err, res, done) => {
    if (err) {
      console.log(err);
    } else {
      try {
        const body = JSON.parse(res.body);
        patchInfo = body;
        console.log(
          `Last update: ${new Date(
            patchInfo.lastUpdated * 1000
          ).toDateString()}`
        );
      } catch (e) {
        console.log(e);
        process.exit(1);
      }
    }
    done();
  },
});

ranks.forEach((rank) => {
  const matchups = {};
  stats[rank] = {
    matchups,
  };
  for (let i = 0; i < allRegions.length; i++) {
    for (let j = i; j < allRegions.length; j++) {
      let regionPath = `region=${allRegions[i]}`;
      if (i !== j) {
        regionPath += `&region=${allRegions[j]}`;
      }

      const current = regionName(allRegions[i], allRegions[j]);

      c.queue({
        uri: `https://lor.mobalytics.gg/api/v2/meta/statistics/regions/matchups?${regionPath}&rank=${rank}`,
        callback: (err, res, done) => {
          if (err) {
            console.log(err);
          } else {
            try {
              const body = JSON.parse(res.body);
              matchups[current] = [...body.bestMatchups, ...body.worstMatchups];
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

  c.queue({
    uri: `https://lor.mobalytics.gg/api/v2/meta/statistics/regions?rank=${rank}`,
    callback: (err, res, done) => {
      if (err) {
        console.log(err);
      } else {
        try {
          const body = JSON.parse(res.body);
          stats[rank].regionStats = body.regionsStats;
        } catch (e) {
          console.log(e);
          process.exit(1);
        }
      }
      done();
    },
  });
});

c.on("drain", () => {
  let folder = new Date(patchInfo.lastUpdated * 1000).toISOString();
  folder = folder.substr(0, folder.indexOf("T"));
  console.log(`Storing in "${folder}"`);
  fs.mkdirSync(path.join(__dirname, folder), { recursive: true });
  Object.entries(stats).forEach(([rank, data]) => {
    Object.entries(data.matchups).forEach(([r, matchupData]) => {
      fs.writeFileSync(
        path.join(__dirname, folder, fileName(r, rank)),
        JSON.stringify(matchupData, null, 2)
      );
    });

    fs.writeFileSync(
      path.join(__dirname, folder, fileName("regions", rank)),
      JSON.stringify(data.regionStats, null, 2)
    );
  });

  fs.writeFileSync(
    path.join(__dirname, folder, "patchInfo.json"),
    JSON.stringify(patchInfo, null, 2)
  );
});
