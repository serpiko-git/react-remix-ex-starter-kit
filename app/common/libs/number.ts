export async function Abs(number: number | string) {
  if (typeof number === 'number') {
    return Math.abs(number);
  }
  if (typeof number === 'string') {
    return Math.abs(Number(number));
  }
  return Math.abs(Number(0));
}
