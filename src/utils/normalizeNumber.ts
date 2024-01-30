export default function normalizeNumber(
  value: number,
  digitsCount: number
): string {
  if (!Number.isInteger(value)) {
    return "0".repeat(digitsCount);
  }
  const stringValue = value.toString();
  let result = "0".repeat(digitsCount - stringValue.length) + stringValue;
  return result;
}
