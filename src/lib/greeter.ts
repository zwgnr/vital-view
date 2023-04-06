import dayjs from "dayjs";

export function greeter() {
  const d = dayjs();
  if (d.hour() <= 11) return "Good Morning,";
  if (d.hour() >= 12 && d.hour() <= 18) return "Good Afternoon,";
  return "Good Evening,";
}
