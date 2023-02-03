import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { getToken } from "next-auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const { query } = req.query as { query: string };
  //console.log("getsleep", query);
  const response = await getToken({ req });
  const token = response?.accessToken;

  const url = `https://api.ouraring.com/v2/usercollection/daily_sleep`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const ouraResponse = await fetch(url, { headers });
  const result = await ouraResponse.json();
  //const length = result.data.length;

  //const yesterday = length - 1;
  const currentSleepScore: Number = result.data[1].score;

  //console.log("getSleepAuthToken", token);
 // console.log("sleep", result.data);
  return res.status(200).json({
    todaysScore: currentSleepScore,
  });
};
