export default function normalizeTime(
  hour: number | string,
  minute: number | string
) {
  const hourValue = typeof hour === "string" ? Number.parseInt(hour) : hour;
  const minuteValue =
    typeof minute === "string" ? Number.parseInt(minute) : minute;
  return (
    (hourValue < 10 ? "0" + hourValue : hourValue) +
    ":" +
    (minuteValue < 10 ? "0" + minuteValue : minuteValue)
  );
}
