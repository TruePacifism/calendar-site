export default function validateNumbersInput(
  input: string,
  min: number,
  max: number
): number {
  console.log(input);
  console.log(min);
  console.log(max);

  const number = Number.parseInt(input);
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
