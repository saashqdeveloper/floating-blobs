export function getRandomNumber(
  min: number,
  max: number,
  direction: number = 1
): number {
  const delta = max - min;
  return (min + delta * Math.random()) * direction;
}
