export default function normalizeTime(
  hour: number | string,
  minute: number | string
) {
  if (hour.toString() === "-1" || minute.toString() === "-1") {
    return "00:00";
  }
  const hourValue = typeof hour === "string" ? Number.parseInt(hour) : hour;
  const minuteValue =
    typeof minute === "string" ? Number.parseInt(minute) : minute;
  return (
    (hourValue < 10 ? "0" + hourValue : hourValue) +
    ":" +
    (minuteValue < 10 ? "0" + minuteValue : minuteValue)
  );
}
