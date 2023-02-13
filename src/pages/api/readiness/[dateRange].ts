import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { getRange, getPriorRange } from "../../../lib/range/getRanges";
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
} from "../../../lib/range/rangeMath";
import { queryDates } from "../../../lib/dates/dates";
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
    const url = `https://api.ouraring.com/v2/usercollection/daily_readiness?${queryDates[dateRange]}`;
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
            score: [result.data[1].score],
            activityBalance: [result.data[1].contributors.activity_balance],
            bodyTemperature: [result.data[1].contributors.body_temperature],
            hrvBalance: [result.data[1].contributors.hrv_balance],
            previousDayActivity: [
              result.data[1].contributors.previous_day_activity,
            ],
            previousNight: [result.data[1].contributors.previous_night],
            recoveryIndex: [result.data[1].contributors.recovery_index],
            restingHeartRate: [result.data[1].contributors.resting_heart_rate],
            sleepBalance: [result.data[1].contributors.sleep_balance],
          },
          rangeAverage: {
            score: [result.data[1].score],
          },
          percentChange: {
            score: getDailyChange(data, "score"),
          },
          timePeriod: [result.data[1].day],
        });
      case "thisYear":
        return res.status(200).json({
          rangeDataPoints: {
            score: getYearlyRangeData(getRange(dateRange, data), "score"),
            activityBalance: getYearlyContributorData(
              getRange(dateRange, data),
              "activity_balance"
            ),
            bodyTemperature: getYearlyContributorData(
              getRange(dateRange, data),
              "body_temperature"
            ),
            hrvBalance: getYearlyContributorData(
              getRange(dateRange, data),
              "hrv_balance"
            ),
            previousDayActivity: getYearlyContributorData(
              getRange(dateRange, data),
              "previous_day_activity"
            ),
            previousNight: getYearlyContributorData(
              getRange(dateRange, data),
              "previous_night"
            ),
            recoveryIndex: getYearlyContributorData(
              getRange(dateRange, data),
              "recovery_index"
            ),
            restingHeartRate: getYearlyContributorData(
              getRange(dateRange, data),
              "resting_heart_rate"
            ),
            sleepBalance: getYearlyContributorData(
              getRange(dateRange, data),
              "sleep_balance"
            ),
          },
          priorRangeDataPoints: {
            score: getYearlyRangeData(getPriorRange(dateRange, data), "score"),
            //efficiency: getYearlyRangeData(
            //  getPriorRange(dateRange, result),
            //  "efficiency"
            //),
          },
          rangeAverage: {
            score: getYearlyRangeAverage(getRange(dateRange, data), "score"),
            // efficiency: getYearlyContributorAverage(
            //  getRange(dateRange, result),
            //   "efficiency"
            //  ),
          },
          percentChange: {
            score: getYearlyPercentChange(dateRange, data, "score"),
            //efficiency: getYearlyContributorChange(
            //  dateRange,
            //   result,
            //  "efficiency"
            // ),
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
            activityBalance: getContributorData(
              getRange(dateRange, data),
              "activity_balance"
            ),
            bodyTemperature: getContributorData(
              getRange(dateRange, data),
              "body_temperature"
            ),
            hrvBalance: getContributorData(
              getRange(dateRange, data),
              "hrv_balance"
            ),
            previousDayActivity: getContributorData(
              getRange(dateRange, data),
              "previous_day_activity"
            ),
            previousNight: getContributorData(
              getRange(dateRange, data),
              "previous_night"
            ),
            recoveryIndex: getContributorData(
              getRange(dateRange, data),
              "recovery_index"
            ),
            restingHeartRate: getContributorData(
              getRange(dateRange, data),
              "resting_heart_rate"
            ),
            sleepBalance: getContributorData(
              getRange(dateRange, data),
              "sleep_balance"
            ),
          },
          priorRangeDataPoints: {
            score: getRangeData(getPriorRange(dateRange, data), "score"),
            //efficiency: getContributorData(
            // getPriorRange(dateRange, result),
            //  "efficiency"
            // ),
          },
          rangeAverage: {
            score: getRangeAverage(getRange(dateRange, data), "score"),
            //efficiency: getContributorAverage(
            //  getRange(dateRange, result),
            //  "efficiency"
            // ),
          },
          percentChange: {
            score: getChange(dateRange, data, "score"),
            //efficiency: getContributorChange(dateRange, result, "efficiency"),
          },
          timePeriod: getTimePeriod(dateRange, data),
        });
    }
  }
};
