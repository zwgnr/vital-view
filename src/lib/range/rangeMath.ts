import dayjs from "dayjs";
import { getRange, getPriorRange } from "./getRanges";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);
//range = filtered timeframe, param = oura key >>> returns array of individual stats for the time period
export const getRangeData = (range: object[], param: string) =>
  range.map((item: { [key: string]: any }) => item[param]);

export const getRangeAverage = (range: object[], param: string) => {
  let rangeData = getRangeData(range, param);
  let averageScore = Math.floor(
    rangeData.reduce((acc, curr) => acc + curr, 0) / rangeData.length
  );
  return averageScore;
};
//arr = timeFrame >>> converts returned Oura total duration(seconds) to hour format.
export const getDurationHours = (
  dateRange: string,
  data: object[],
  param: string
) => {
  let durationInSeconds = getRangeData(getRange(dateRange, data), param);
  let duration = durationInSeconds.map((item: number) =>
    Number(dayjs.duration(item, "seconds").asHours().toFixed(1))
  );
  return duration;
};

export const getAverageDuration = (
  dateRange: string,
  data: object[],
  param: string
) => {
  let rangeData = getDurationHours(dateRange, data, param);
  let averageDuration = Number(
    (
      rangeData.reduce((acc: any, curr: any) => acc + curr, 0) /
      rangeData.length
    ).toFixed(1)
  );
  return averageDuration;
};

export const getChange = (dateRange: string, data: object[], param: string) => {
  const currentRangeAvg = getRangeAverage(getRange(dateRange, data), param);
  const priorRangeAvg = getRangeAverage(getPriorRange(dateRange, data), param);
  return Number(
    (((currentRangeAvg - priorRangeAvg) / priorRangeAvg) * 100).toFixed(1)
  );
};

export const getDailyChange = (data: any[], param: string) => {
  const todaysAverage = data[1][param];
  const yesterdaysAverage = data[0][param];
  return Number(
    (((todaysAverage - yesterdaysAverage) / yesterdaysAverage) * 100).toFixed(1)
  );
};

//range = time period, param = oura key >>> returns array of individual stats in months for the time period
export const getYearlyRangeData = (range: object[], param: string) => {
  //filter the month part of returned oura 'day' key to sort into appropriate months
  const filterMonth = (month: string) =>
    range.filter(
      (item: { [day: string]: any }) => item.day.substring(5, 7) === month
    );

  const getMonthlyAverage = (monthRangeData: object[]) =>
    monthRangeData.length < 1 ? 0 : getRangeAverage(monthRangeData, param);

  const jan = filterMonth("01");
  const janRangeAvg = getMonthlyAverage(jan);

  const feb = filterMonth("02");
  const febAvg = getMonthlyAverage(feb);

  const march = filterMonth("03");
  const marchAvg = getMonthlyAverage(march);

  const april = filterMonth("04");
  const aprilAvg = getMonthlyAverage(april);

  const may = filterMonth("05");
  const mayAvg = getMonthlyAverage(may);

  const jun = filterMonth("06");
  const junAvg = getMonthlyAverage(jun);

  const jul = filterMonth("07");
  const julAvg = getMonthlyAverage(jul);

  const aug = filterMonth("08");
  const augAvg = getMonthlyAverage(aug);

  const sept = filterMonth("09");
  const septAvg = getMonthlyAverage(sept);

  const oct = filterMonth("10");
  const octAvg = getMonthlyAverage(oct);

  const nov = filterMonth("11");
  const novAvg = getMonthlyAverage(nov);

  const dec = filterMonth("12");
  const decAvg = getMonthlyAverage(dec);

  const montlyAverages = [
    janRangeAvg,
    febAvg,
    marchAvg,
    aprilAvg,
    mayAvg,
    junAvg,
    julAvg,
    augAvg,
    septAvg,
    octAvg,
    novAvg,
    decAvg,
  ];
  return montlyAverages;
};

export const getYearlyRangeAverage = (range: object[], param: string) => {
  let rangeData = getYearlyRangeData(range, param);
  let filterZero = rangeData.filter((val) => val !== 0);
  let rangeAverage = Math.floor(
    filterZero.reduce((acc, curr) => acc + curr, 0) / filterZero.length
  );
  return rangeAverage;
};

export const getYearlyDurationHours = (
  dateRange: string,
  data: object[],
  param: string
) => {
  let durationInSeconds = getYearlyRangeData(getRange(dateRange, data), param);
  let duration = durationInSeconds.map((item: number) =>
    Number(dayjs.duration(item, "seconds").asHours().toFixed(1))
  );
  return duration;
};

export const getPriorYearlyDurationHours = (
  dateRange: string,
  data: object[],
  param: string
) => {
  let durationInSeconds = getYearlyRangeData(
    getPriorRange(dateRange, data),
    param
  );
  let duration = durationInSeconds.map((item: number) =>
    Number(dayjs.duration(item, "seconds").asHours().toFixed(1))
  );
  return duration;
};

export const getPriorYearlyDurationAverage = (
  dateRange: string,
  data: object[],
  param: string
) => {
  let rangeData = getPriorYearlyDurationHours(dateRange, data, param);
  let filterZero = rangeData.filter((val) => val !== 0);
  let rangeAverage = Number(
    filterZero.reduce((acc, curr) => acc + curr, 0) / filterZero.length
  ).toFixed(1);
  return rangeAverage;
};

export const getYearlyDurationAverage = (
  dateRange: string,
  data: object[],
  param: string
) => {
  let rangeData = getYearlyDurationHours(dateRange, data, param);
  let filterZero = rangeData.filter((val) => val !== 0);
  let rangeAverage = Number(
    filterZero.reduce((acc, curr) => acc + curr, 0) / filterZero.length
  ).toFixed(1);
  return rangeAverage;
};

export const getYearlyPercentChange = (
  dateRange: string,
  data: object[],
  param: string
) => {
  const currentRangeAvg = getYearlyRangeAverage(
    getRange(dateRange, data),
    param
  );
  const priorRangeAvg = getYearlyRangeAverage(
    getPriorRange(dateRange, data),
    param
  );
  return Number(
    ((currentRangeAvg - priorRangeAvg) / priorRangeAvg) * 100
  ).toFixed(1);
};

export const getContributorData = (range: object[], param: string) =>
  range.map(
    (item: { [contributors: string]: any }) => item.contributors[param]
  );

export const getContributorAverage = (range: object[], param: string) => {
  let rangeData = getContributorData(range, param);
  let rangeAverage = Math.floor(
    rangeData.reduce((acc, curr) => acc + curr, 0) / rangeData.length
  );
  return rangeAverage;
};

export const getContributorChange = (
  dateRange: string,
  data: object[],
  param: string
) => {
  const currentRangeAvg = getContributorAverage(
    getRange(dateRange, data),
    param
  );
  const priorRangeAvg = getContributorAverage(
    getPriorRange(dateRange, data),
    param
  );
  return Number(
    (((currentRangeAvg - priorRangeAvg) / priorRangeAvg) * 100).toFixed(1)
  );
};

export const getYearlyContributorData = (range: object[], param: string) => {
  //filter the month part of returned oura 'day' key to sort into appropriate months
  const filterMonth = (month: string) =>
    range.filter(
      (item: { [day: string]: any }) => item.day.substring(5, 7) === month
    );

  const getMonthlyAverage = (monthRangeData: object[]) =>
    monthRangeData.length < 1
      ? 0
      : getContributorAverage(monthRangeData, param);

  const jan = filterMonth("01");
  const janRangeAvg = getMonthlyAverage(jan);

  const feb = filterMonth("02");
  const febAvg = getMonthlyAverage(feb);

  const march = filterMonth("03");
  const marchAvg = getMonthlyAverage(march);

  const april = filterMonth("04");
  const aprilAvg = getMonthlyAverage(april);

  const may = filterMonth("05");
  const mayAvg = getMonthlyAverage(may);

  const jun = filterMonth("06");
  const junAvg = getMonthlyAverage(jun);

  const jul = filterMonth("07");
  const julAvg = getMonthlyAverage(jul);

  const aug = filterMonth("08");
  const augAvg = getMonthlyAverage(aug);

  const sept = filterMonth("09");
  const septAvg = getMonthlyAverage(sept);
  //console.log(sept);

  const oct = filterMonth("10");
  const octAvg = getMonthlyAverage(oct);

  const nov = filterMonth("11");
  const novAvg = getMonthlyAverage(nov);

  const dec = filterMonth("12");
  const decAvg = getMonthlyAverage(dec);

  const montlyAverages = [
    janRangeAvg,
    febAvg,
    marchAvg,
    aprilAvg,
    mayAvg,
    junAvg,
    julAvg,
    augAvg,
    septAvg,
    octAvg,
    novAvg,
    decAvg,
  ];
  return montlyAverages;
};

export const getYearlyContributorAverage = (range: object[], param: string) => {
  let rangeData = getYearlyContributorData(range, param);
  let filterZero = rangeData.filter((val) => val !== 0);
  let rangeAverage = Math.floor(
    filterZero.reduce((acc, curr) => acc + curr, 0) / filterZero.length
  );
  return rangeAverage;
};

export const getYearlyContributorChange = (
  dateRange: string,
  data: object[],
  param: string
) => {
  const currentRangeAvg = getYearlyContributorAverage(
    getRange(dateRange, data),
    param
  );
  const priorRangeAvg = getYearlyContributorAverage(
    getPriorRange(dateRange, data),
    param
  );
  return Number(
    ((currentRangeAvg - priorRangeAvg) / priorRangeAvg) * 100
  ).toFixed(1);
};

//returns an array of the individual dates for a given time period in days
export const getTimePeriod = (dateRange: string, data: object[]) => {
  let currentRange = getRange(dateRange, data);
  const oldDates = currentRange.map((item: { [day: string]: any }) => item.day);
  const newDates = oldDates.map((element: string) =>
    dayjs(element).format("MM-DD-YY")
  );
  return newDates;
};
export const convertToHours = (seconds: number) =>
  Number(dayjs.duration(seconds, "seconds").asHours().toFixed(1));

export const getRangeDurationPoints = (
  dateRange: string,
  data: object[],
  param: string
) => {
  let durationPointsInSeconds = getRangeData(getRange(dateRange, data), param);
  return durationPointsInSeconds.map((item) => convertToHours(item));
};

export const getPriorDurationHours = (
  dateRange: string,
  data: object[],
  param: string
) => {
  let durationInSeconds = getRangeData(getPriorRange(dateRange, data), param);
  let duration = durationInSeconds.map((item: number) =>
    Number(dayjs.duration(item, "seconds").asHours().toFixed(1))
  );
  return duration;
};

export const getPriorAverageDuration = (
  dateRange: string,
  data: object[],
  param: string
) => {
  let rangeData = getPriorDurationHours(dateRange, data, param);
  let averageDuration = Number(
    (
      rangeData.reduce((acc: any, curr: any) => acc + curr, 0) /
      rangeData.length
    ).toFixed(1)
  );
  return averageDuration;
};

export const getDurationChange = (
  dateRange: string,
  data: object[],
  param: string
) => {
  const currentRangeAvg = getAverageDuration(dateRange, data, param);
  const priorRangeAvg = getPriorAverageDuration(dateRange, data, param);
  return Number(
    (((currentRangeAvg - priorRangeAvg) / priorRangeAvg) * 100).toFixed(1)
  );
};

export const getDailyDurationChange = (data: any[]) => {
  const todaysAvg = convertToHours(data[1]!.total_sleep_duration);
  const yesterDaysAvg = convertToHours(data[0]!.total_sleep_duration);
  return Number(
    (((todaysAvg - yesterDaysAvg) / yesterDaysAvg) * 100).toFixed(1)
  );
};

export const getYearlyDurationChange = (
  dateRange: string,
  data: object[],
  param: string
) => {
  const currentRangeAvg = Number(
    getYearlyDurationAverage(dateRange, data, param)
  );
  const priorRangeAvg = Number(
    getPriorYearlyDurationAverage(dateRange, data, param)
  );
  return Number(
    ((currentRangeAvg - priorRangeAvg) / priorRangeAvg) * 100
  ).toFixed(1);
};
