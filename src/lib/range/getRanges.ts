import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  dateTommorrow,
  oneWeekAgo,
  thirtyDaysAgo,
  twoWeeksAgo,
  sixtyDaysAgo,
} from "../dates/dates";

dayjs.extend(isBetween);

export type Day = { [day: string]: any };

export const getRange = (dateRange: string, data: object[]) => {
  switch (dateRange) {
    case "today":
      return data;
    case "last30Days":
      return data.filter((item: Day) =>
        dayjs(item.day).isBetween(dateTommorrow, thirtyDaysAgo)
      );
    case "thisYear":
      return data.filter(
        (item: Day) => dayjs(item.day).format("YYYY") === String(dayjs().year())
      );
    default:
      "last7Days";
      return data.filter((item: Day) =>
        dayjs(item.day).isBetween(dateTommorrow, oneWeekAgo)
      );
  }
};

export const getPriorRange = (dateRange: string, data: object[]) => {
  switch (dateRange) {
    case "today":
      return data;
    case "last30Days":
      return data.filter((item: Day) =>
        dayjs(item.day).isBetween(
          dayjs(thirtyDaysAgo).add(1, "day").format("YYYY-MM-DD"),
          sixtyDaysAgo
        )
      );
    case "thisYear":
      return data.filter(
        (item: Day) =>
          dayjs(item.day).format("YYYY") === String(dayjs().year() - 1)
      );
    default:
      "last7Days";
      return data.filter((item: Day) =>
        dayjs(item.day).isBetween(
          dayjs(oneWeekAgo).add(1, "day").format("YYYY-MM-DD"),
          twoWeeksAgo
        )
      );
  }
};
