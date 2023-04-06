import type { NextApiRequest, NextApiResponse } from "next";

import { getRange } from "../../../lib/range/getRanges";
import {
  getRangeData,
  getChange,
  getRangeAverage,
  getTimePeriod,
  getYearlyRangeAverage,
  getYearlyRangeData,
  getContributorData,
  getYearlyContributorData,
  getYearlyPercentChange,
  getDailyChange,
  getAverageDuration,
  getYearlyDurationAverage,
  convertToHours,
} from "../../../lib/range/rangeMath";
import { queryDates } from "../../../lib/dates/dates";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ message: "You must be logged in to access this content" });
  } else {
    const token = session?.accessToken;

    const { dateRange } = req.query as { dateRange: string };
    const url = `https://api.ouraring.com/v2/usercollection/daily_activity?${queryDates[dateRange]}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const ouraResponse = await fetch(url, { headers });
    const result = await ouraResponse.json();
    const data = result.data;

    switch (dateRange) {
      case "today":
        return res.status(200).json({
          rangeDataPoints: {
            score: [data[1].score],
            activeCalories: [data[1].active_calories],
            steps: [data[1].steps],
            meetDailyTargets: [data[1].contributors.meet_daily_targets],
            moveEveryHour: [data[1].contributors.move_every_hour],
            recoveryTime: [data[1].contributors.recovery_time],
            stayActive: [data[1].contributors.stay_active],
            trainingFrequency: [data[1].contributors.training_frequency],
            trainingVolume: [data[1].contributors.training_volume],
          },
          rangeAverage: {
            score: data[1].score,
            activeCalories: data[1].active_calories,
            steps: data[1].steps,
            lowActiveTime: convertToHours(data[1].low_activity_time),
            medActiveTime: convertToHours(data[1].medium_activity_time),
            highActiveTime: convertToHours(data[1].high_activity_time),
          },
          percentChange: {
            score: getDailyChange(data, "score"),
            activeCalories: getDailyChange(data, "activeCalories"),
            steps: getDailyChange(data, "steps"),
          },
          timePeriod: [result.data[1].day],
        });
      case "thisYear":
        return res.status(200).json({
          rangeDataPoints: {
            score: getYearlyRangeData(getRange(dateRange, data), "score"),
            activeCalories: getYearlyRangeData(
              getRange(dateRange, data),
              "active_calories"
            ),
            steps: getYearlyRangeData(getRange(dateRange, data), "steps"),
            meetDailyTargets: getYearlyContributorData(
              getRange(dateRange, data),
              "meet_daily_targets"
            ),
            moveEveryHour: getYearlyContributorData(
              getRange(dateRange, data),
              "move_every_hour"
            ),
            recoveryTime: getYearlyContributorData(
              getRange(dateRange, data),
              "recovery_time"
            ),
            stayActive: getYearlyContributorData(
              getRange(dateRange, data),
              "stay_active"
            ),
            trainingFrequency: getYearlyContributorData(
              getRange(dateRange, data),
              "training_frequency"
            ),
            trainingVolume: getYearlyContributorData(
              getRange(dateRange, data),
              "training_volume"
            ),
          },
          rangeAverage: {
            score: getYearlyRangeAverage(getRange(dateRange, data), "score"),
            activeCalories: getYearlyRangeAverage(
              getRange(dateRange, data),
              "active_calories"
            ),
            steps: getYearlyRangeAverage(getRange(dateRange, data), "steps"),
            lowActiveTime: getYearlyDurationAverage(
              dateRange,
              data,
              "low_activity_time"
            ),
            medActiveTime: getYearlyDurationAverage(
              dateRange,
              data,
              "medium_activity_time"
            ),
            highActiveTime: getYearlyDurationAverage(
              dateRange,
              data,
              "high_activity_time"
            ),
          },
          percentChange: {
            score: getYearlyPercentChange(dateRange, data, "score"),
            activeCalories: getYearlyPercentChange(
              dateRange,
              data,
              "active_calories"
            ),
            steps: getYearlyPercentChange(dateRange, data, "steps"),
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
            score: getRangeData(getRange(dateRange, data), "score"),
            activeCalories: getRangeData(
              getRange(dateRange, data),
              "active_calories"
            ),
            steps: getRangeData(getRange(dateRange, data), "steps"),
            meetDailyTargets: getContributorData(
              getRange(dateRange, data),
              "meet_daily_targets"
            ),
            moveEveryHour: getContributorData(
              getRange(dateRange, data),
              "move_every_hour"
            ),
            recoveryTime: getContributorData(
              getRange(dateRange, data),
              "recovery_time"
            ),
            stayActive: getContributorData(
              getRange(dateRange, data),
              "stay_active"
            ),
            trainingFrequency: getContributorData(
              getRange(dateRange, data),
              "training_frequency"
            ),
            trainingVolume: getContributorData(
              getRange(dateRange, data),
              "training_volume"
            ),
          },
          rangeAverage: {
            score: getRangeAverage(getRange(dateRange, data), "score"),
            activeCalories: getRangeAverage(
              getRange(dateRange, data),
              "active_calories"
            ),
            steps: getRangeAverage(getRange(dateRange, data), "steps"),
            lowActiveTime: getAverageDuration(
              dateRange,
              data,
              "low_activity_time"
            ),
            medActiveTime: getAverageDuration(
              dateRange,
              data,
              "medium_activity_time"
            ),
            highActiveTime: getAverageDuration(
              dateRange,
              data,
              "high_activity_time"
            ),
          },
          percentChange: {
            score: getChange(dateRange, data, "score"),
            activeCalories: getChange(dateRange, data, "active_calories"),
            steps: getChange(dateRange, data, "steps"),
          },
          timePeriod: getTimePeriod(dateRange, data),
        });
    }
  }
};
