import dayjs from "dayjs";

export const dateTommorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
export const dateToday = dayjs().format("YYYY-MM-DD");
export const dateYesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
export const oneWeekAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD");
export const fourteenDaysAgo = dayjs().subtract(13, "day").format("YYYY-MM-DD");
export const twoWeeksAgo = dayjs().subtract(14, "day").format("YYYY-MM-DD");
export const thirtyDaysAgo = dayjs().subtract(30, "day").format("YYYY-MM-DD");
export const sixtyDaysAgo = dayjs().subtract(59, "day").format("YYYY-MM-DD");
export const thisYearend = `${dayjs().year() + 1}-01-01`;
export const lastYearStart = `${dayjs().year() - 1}-01-01`;

//selected period queries the dates for the current period as well as the prior period of the same length
export const queryDates: Record<string, string> = {
  today: `start_date=${dateYesterday}&end_date=${dateTommorrow}`,
  last7Days: `start_date=${fourteenDaysAgo}&end_date=${dateTommorrow}`,
  last30Days: `start_date=${sixtyDaysAgo}&end_date=${dateTommorrow}`,
  thisYear: `start_date=${lastYearStart}&end_date=${thisYearend}`,
};
