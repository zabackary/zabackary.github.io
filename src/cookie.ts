// A 9-lobed cookie in a -1..1 box: a circle whose radius wobbles nine times around
export const cookiePath =
  "M" +
  Array.from({ length: 180 }, (_, i) => {
    const angle = (i / 180) * 2 * Math.PI;
    const radius = 0.9 + 0.1 * Math.cos(9 * angle);
    return `${(radius * Math.cos(angle)).toFixed(3)} ${(radius * Math.sin(angle)).toFixed(3)}`;
  }).join("L") +
  "Z";
