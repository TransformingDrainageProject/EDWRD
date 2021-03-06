export function getMax(data) {
  const max = data.reduce((a, b) => {
    if (b.y > a.y) {
      return b;
    } else {
      return a;
    }
  });

  return max.y;
}

export function getMaxima(data) {
  // find overall maximum for current active datasets
  let maxima = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const max = getMax(data[i][j].values);
      if (max > maxima) {
        maxima = max;
      }
    }
  }

  return maxima;
}
