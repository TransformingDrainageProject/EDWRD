// Planting and harvest dates based on state
const CURRENT_YEAR = new Date().getFullYear();
export const GROWING_DATES = {
  il: {
    planting: new Date(CURRENT_YEAR, 4, 7),
    harvest: new Date(CURRENT_YEAR, 9, 14)
  },
  in: {
    planting: new Date(CURRENT_YEAR, 4, 16),
    harvest: new Date(CURRENT_YEAR, 9, 21)
  },
  ia: {
    planting: new Date(CURRENT_YEAR, 4, 6),
    harvest: new Date(CURRENT_YEAR, 9, 22)
  },
  ks: {
    planting: new Date(CURRENT_YEAR, 3, 30),
    harvest: new Date(CURRENT_YEAR, 9, 2)
  },
  ky: {
    planting: new Date(CURRENT_YEAR, 4, 4),
    harvest: new Date(CURRENT_YEAR, 9, 1)
  },
  mi: {
    planting: new Date(CURRENT_YEAR, 4, 14),
    harvest: new Date(CURRENT_YEAR, 10, 2)
  },
  mn: {
    planting: new Date(CURRENT_YEAR, 4, 7),
    harvest: new Date(CURRENT_YEAR, 9, 23)
  },
  mo: {
    planting: new Date(CURRENT_YEAR, 4, 4),
    harvest: new Date(CURRENT_YEAR, 9, 6)
  },
  nb: {
    planting: new Date(CURRENT_YEAR, 4, 6),
    harvest: new Date(CURRENT_YEAR, 9, 22)
  },
  nd: {
    planting: new Date(CURRENT_YEAR, 4, 15),
    harvest: new Date(CURRENT_YEAR, 9, 29)
  },
  oh: {
    planting: new Date(CURRENT_YEAR, 4, 9),
    harvest: new Date(CURRENT_YEAR, 9, 31)
  },
  sd: {
    planting: new Date(CURRENT_YEAR, 4, 14),
    harvest: new Date(CURRENT_YEAR, 9, 26)
  },
  wi: {
    planting: new Date(CURRENT_YEAR, 4, 14),
    harvest: new Date(CURRENT_YEAR, 9, 31)
  }
};

// Days to increment planting date by based on crop type and part of season
export const CORN_DATE_RANGES = {
  plant: 0,
  init: 30,
  dev: 30 + 40,
  mid: 30 + 40 + 50,
  late: 30 + 40 + 50 + 30,
  harvest: 0
};
export const SOYBEAN_DATE_RANGES = {
  plant: 0,
  init: 20,
  dev: 20 + 35,
  mid: 20 + 35 + 60,
  late: 20 + 35 + 60 + 25,
  harvest: 0
};
