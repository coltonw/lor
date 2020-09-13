exports.lowerBound = (numWins, numGames) => {
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

exports.regionName = (r1, r2) => {
  if (!r2 || r1 === r2) return r1;
  if (r1 < r2) {
    return `${r1}_${r2}`;
  }
  return `${r2}_${r1}`;
};

exports.deckName = {
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

exports.allRegions = ["BW", "FR", "IO", "PZ", "MT", "SI", "DE", "NX"];

// Tournament region spread from here:
// https://www.reddit.com/r/LoRCompetitive/comments/iq51as/the_tournament_meta_of_patch_18_260820090920/
exports.regionSpread = {
  BW_NX: 12,
  FR_SI: 11,
  FR_NX: 8,
  DE_MT: 7,
  DE_IO: 7,
  BW_DE: 6,
  IO_PZ: 6,
  FR_MT: 5,
  MT_SI: 5,
  BW_SI: 4,
};

exports.tableLine = (region, lb, avg, padStart) => {
  return `${padStart ? "  " : ""}${(exports.deckName[region] || region).padEnd(
    padStart ? 18 : 20
  )}${((lb * 100).toFixed(1) + "").padStart(4)}%  ${(
    (avg * 100).toFixed(1) + ""
  ).padStart(4)}%\n`;
};

exports.fileName = (regionName, rank) => {
  return `${regionName.toLowerCase()}${
    rank.slice(0, 1).toUpperCase() + rank.slice(1)
  }.json`;
};
