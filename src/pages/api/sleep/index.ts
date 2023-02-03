import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { getToken } from "next-auth/jwt";

type Data = {
  todaysScore: Number;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const d = dayjs();
  let todaysDate = dayjs().format("YYYY-MM-DD");
  let tommorowsDate = dayjs().add(1, "day").format("YYYY-MM-DD");
  let queryDates = `start_date=2015-01-01&end_date=${tommorowsDate}`;
  //console.log("getsleep", tommorowsDate);
  const response = await getToken({ req });
  const token = response?.accessToken;

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const baseUrl = "https://api.ouraring.com/v2/usercollection";
  //////////////////////////////////////////////////////////////////////
  const dailySleepUrl = `${baseUrl}/daily_sleep`;
  const dailySleepResponse = await fetch(dailySleepUrl, { headers });
  const dailySleepResult = await dailySleepResponse.json();

  const totalDailySleepDays = dailySleepResult.data.length;

  const currentSleepScore: Number =
    dailySleepResult.data[totalDailySleepDays - 1].score;
  //return an array of Daily Sleep Scores for the last 7 days.
  const last7DaysScore = dailySleepResult.data
    .slice(totalDailySleepDays - 7, totalDailySleepDays)
    .map((item: { score: number }) => item.score);

  //return the average Sleep score over the past 7 days.
  const last7DaysAverageScore = (arr: number[]) =>
    Math.floor(arr.reduce((a, c) => a + c, 0) / arr.length);

  /////////////////////////////////////////////////////////////////////////
  const sleepUrl = `${baseUrl}/sleep?${queryDates}`;
  const sleepResponse = await fetch(sleepUrl, { headers });
  const sleepResult = await sleepResponse.json();
  //console.log("getSleepAuthToken", token);

  //Oura Sleep endpoint returns serval sleep types. Filter to extract long_sleep only//
  let filterLongSleep = sleepResult.data.filter(
    (item: { type: string }) => item.type === "long_sleep"
  );

  const totalLongSleepDays = filterLongSleep.length;

  const last7DaysIndividual = (param: string) =>
    filterLongSleep
      .slice(totalLongSleepDays - 7, totalLongSleepDays)
      .map((item: { [x: string]: any }) => item[param]);

  const last7DaysAverage = (arr: number[]) =>
    Math.floor(arr.reduce((a, c) => a + c, 0) / arr.length);

  ///////////////////////////////////////////////////////////////////////////////
  const last7Days = {
    individualScores: dailySleepResult.data
      .slice(totalDailySleepDays - 7, totalDailySleepDays)
      .map((item: { score: number }) => item.score),
    averageScore: last7DaysAverageScore(last7DaysScore),
    hrv: last7DaysIndividual("average_hrv"),
    averageHrv: last7DaysAverage(last7DaysIndividual("average_hrv")),
    averageHr: last7DaysIndividual("average_heart_rate"),
    averageAverageHr: last7DaysAverage(
      last7DaysIndividual("average_heart_rate")
    ),
    //keeping as resting to conform to Oura app, but it should maybe be avg. instead
    restingHeartRate: last7DaysIndividual("lowest_heart_rate"),
    averageRestingHeartRate: last7DaysAverage(
      last7DaysIndividual("lowest_heart_rate")
    ),
  };
  //console.log("sleep", last7DaysAverage(last7DaysIndividual("average_hrv")));

  return res.status(200).json({
   // stats: dailySleepResult,
    todaysScore: currentSleepScore,
   // days: last7Days,
    //last7Days: last7Days,
  });
};
