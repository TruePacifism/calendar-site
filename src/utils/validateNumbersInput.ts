export default function validateNumbersInput(
  input: string,
  min: number,
  max: number
): number {
  const number = Number.parseInt(input);
  console.log(number);
  if (Number.isNaN(number)) {
    return NaN;
  }
  if (number < min) {
    return min;
  }
  if (number > max) {
    return max;
  }
  return number;
}
