import type { NextApiRequest, NextApiResponse } from "next";
import { queryDates } from "../../../lib/dates/dates";
import { baseUrl } from "../../../lib/const";
import {
  convertToHours,
  getAverageDuration,
  getChange,
  getDailyChange,
  getDailyDurationChange,
  getDurationChange,
  getPriorYearlyDurationAverage,
  getRangeAverage,
  getRangeData,
  getRangeDurationPoints,
  getTimePeriod,
  getYearlyDurationAverage,
  getYearlyDurationChange,
  getYearlyDurationHours,
  getYearlyPercentChange,
  getYearlyRangeAverage,
  getYearlyRangeData,
} from "../../../lib/range/rangeMath";
import { getPriorRange, getRange } from "../../../lib/range/getRanges";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ message: "You must be logged in to access this content" });
  } else {
    const token = session?.accessToken;

    const { dateRange } = req.query as { dateRange: string };

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const sleepUrl = `${baseUrl}/sleep?${queryDates[dateRange]}`;
    const ouraResponse = await fetch(sleepUrl, { headers });
    const result = await ouraResponse.json();

    //Oura Sleep endpoint returns several sleep types. Filter to extract long_sleep only//
    const data = result.data.filter(
      (item: { type: string }) => item.type === "long_sleep"
    );

    switch (dateRange) {
      case "today":
        return res.status(200).json({
          rangeDataPoints: {
            hrv: [data[1].average_hrv],
            efficiency: [data[1].efficiency],
            //keeping as resting to conform to Oura app, but it should maybe be avg. instead
            restingHeartRate: [data[1].lowest_heart_rate],
            duration: [convertToHours(data[1].total_sleep_duration)],
          },
          rangeAverage: {
            hrv: data[1].average_hrv,
            restingHeartRate: data[1].lowest_heart_rate,
            efficiency: data[1].efficiency,
            duration: convertToHours(data[1].total_sleep_duration),
            lightSleep: convertToHours(data[1].light_sleep_duration),
            remSleep: convertToHours(data[1].rem_sleep_duration),
            deepSleep: convertToHours(data[1].deep_sleep_duration),
          },
          percentChange: {
            hrvChange: getDailyChange(data, "average_hrv"),
            efficiencyChange: getDailyChange(data, "efficiency"),
            restingHeartRateChange: getDailyChange(data, "lowest_heart_rate"),
            durationChange: getDailyDurationChange(data),
          },
          timePeriod: [data[1].day],
        });
      case "thisYear":
        return res.status(200).json({
          rangeDataPoints: {
            hrv: getYearlyRangeData(getRange(dateRange, data), "average_hrv"),
            efficiency: getYearlyRangeData(
              getRange(dateRange, data),
              "efficiency"
            ),
            restingHeartRate: getYearlyRangeData(
              getRange(dateRange, data),
              "lowest_heart_rate"
            ),
            duration: getYearlyDurationHours(
              dateRange,
              data,
              "total_sleep_duration"
            ),
          },
          rangeAverage: {
            hrv: getYearlyRangeAverage(
              getRange(dateRange, data),
              "average_hrv"
            ),
            efficiency: getYearlyRangeAverage(
              getRange(dateRange, data),
              "efficiency"
            ),
            restingHeartRate: getYearlyRangeAverage(
              getRange(dateRange, data),
              "lowest_heart_rate"
            ),
            duration: getYearlyDurationAverage(
              dateRange,
              data,
              "total_sleep_duration"
            ),
            lightSleep: getYearlyDurationAverage(
              dateRange,
              data,
              "light_sleep_duration"
            ),
            remSleep: getYearlyDurationAverage(
              dateRange,
              data,
              "rem_sleep_duration"
            ),
            deepSleep: getYearlyDurationAverage(
              dateRange,
              data,
              "deep_sleep_duration"
            ),
          },
          percentChange: {
            hrvChange: getYearlyPercentChange(dateRange, data, "average_hrv"),
            efficiencyChange: getYearlyPercentChange(
              dateRange,
              data,
              "efficiency"
            ),
            restingHeartRateChange: getYearlyPercentChange(
              dateRange,
              data,
              "lowest_heart_rate"
            ),
            durationChange: getYearlyDurationChange(
              dateRange,
              data,
              "total_sleep_duration"
            ),
          },
          timePeriod: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
          ],
        });
      default:
        return res.status(200).json({
          rangeDataPoints: {
            hrv: getRangeData(getRange(dateRange, data), "average_hrv"),
            efficiency: getRangeData(getRange(dateRange, data), "efficiency"),
            //keeping as resting to conform to Oura app, but it should maybe be avg. instead
            restingHeartRate: getRangeData(
              getRange(dateRange, data),
              "lowest_heart_rate"
            ),
            duration: getRangeDurationPoints(
              dateRange,
              data,
              "total_sleep_duration"
            ),
          },
          rangeAverage: {
            hrv: getRangeAverage(getRange(dateRange, data), "average_hrv"),
            efficiency: getRangeAverage(
              getRange(dateRange, data),
              "efficiency"
            ),
            restingHeartRate: getRangeAverage(
              getRange(dateRange, data),
              "lowest_heart_rate"
            ),
            duration: getAverageDuration(
              dateRange,
              data,
              "total_sleep_duration"
            ),
            lightSleep: getAverageDuration(
              dateRange,
              data,
              "light_sleep_duration"
            ),
            remSleep: getAverageDuration(dateRange, data, "rem_sleep_duration"),
            deepSleep: getAverageDuration(
              dateRange,
              data,
              "deep_sleep_duration"
            ),
          },
          percentChange: {
            hrvChange: getChange(dateRange, data, "average_hrv"),
            efficiencyChange: getChange(dateRange, data, "efficiency"),
            restingHeartRateChange: getChange(
              dateRange,
              data,
              "lowest_heart_rate"
            ),
            durationChange: getDurationChange(
              dateRange,
              data,
              "total_sleep_duration"
            ),
          },
          timePeriod: getTimePeriod(dateRange, data),
        });
    }
  }
};
