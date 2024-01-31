export default function normalizeTime(hour: string, minute: string): string {
  const hourValue = Number.parseInt(hour);
  const minuteValue = Number.parseInt(minute);

  if (hour.length < 2 && minute === undefined) {
    return "0" + hour;
  }
  if (hour.length === 2 && minute === undefined) {
    if (hourValue < 0) {
      return "00:";
    } else if (hourValue > 23) {
      return "23:";
    } else {
      return hour + ":";
    }
  }
  if (hour.length > 2) {
    return hour.substring(0, 2) + ":" + hour.charAt(2);
  }
  if (minute.length < 2) {
    return (hour.length < 2 ? "0" + hour : hour) + ":0" + minute;
  }
  if (minute.length === 2) {
    if (minuteValue < 0) {
      return (hour.length < 2 ? "0" + hour : hour) + ":00";
    } else if (minuteValue > 59) {
      return (hour.length < 2 ? "0" + hour : hour) + ":59";
    } else {
      return (hour.length < 2 ? "0" + hour : hour) + ":" + minute;
    }
  }
  // let oldHour = Number.parseInt(oldValue.split(":")[0]);
  // let oldMinute = Number.parseInt(oldValue.split(":")[1]);
  return hour;
}
