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
    const url = `https://api.ouraring.com/v2/usercollection/daily_sleep?${queryDates[dateRange]}`;
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
            efficiency: [result.data[1].contributors.efficiency],
            latency: [result.data[1].contributors.latency],
            restfulness: [result.data[1].contributors.restfulness],
            timing: [result.data[1].contributors.timing],
            deepSleep: [result.data[1].contributors.deep_sleep],
            remSleep: [result.data[1].contributors.rem_sleep],
            totalSleep: [result.data[1].contributors.total_sleep],
          },
          rangeAverage: {
            score: [result.data[1].score],
          },
          percentChange: {
            score: getDailyChange(data, "score"),
          },
        });
      case "thisYear":
        return res.status(200).json({
          rangeDataPoints: {
            score: getYearlyRangeData(getRange(dateRange, data), "score"),
            efficiency: getYearlyContributorData(
              getRange(dateRange, data),
              "efficiency"
            ),
            latency: getYearlyContributorData(
              getRange(dateRange, data),
              "latency"
            ),
            restfulness: getYearlyContributorData(
              getRange(dateRange, data),
              "restfulness"
            ),
            timing: getYearlyContributorData(
              getRange(dateRange, data),
              "timing"
            ),
            deepSleep: getYearlyContributorData(
              getRange(dateRange, data),
              "deep_sleep"
            ),
            remSleep: getYearlyContributorData(
              getRange(dateRange, data),
              "rem_sleep"
            ),
            totalSleep: getYearlyContributorData(
              getRange(dateRange, data),
              "total_sleep"
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
            efficiency: getContributorData(
              getRange(dateRange, data),
              "efficiency"
            ),
            latency: getContributorData(getRange(dateRange, data), "latency"),
            restfulness: getContributorData(
              getRange(dateRange, data),
              "restfulness"
            ),
            timing: getContributorData(getRange(dateRange, data), "timing"),
            deepSleep: getContributorData(
              getRange(dateRange, data),
              "deep_sleep"
            ),
            remSleep: getContributorData(
              getRange(dateRange, data),
              "rem_sleep"
            ),
            totalSleep: getContributorData(
              getRange(dateRange, data),
              "total_sleep"
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
