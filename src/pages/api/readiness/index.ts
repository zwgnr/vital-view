import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { getToken } from "next-auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const { query } = req.query as { query: string };
  //console.log("getsleep", query);
  const response = await getToken({ req });
  const token = response?.accessToken;

  const url = `https://api.ouraring.com/v2/usercollection/daily_readiness`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const ouraResponse = await fetch(url, { headers });
  const result = await ouraResponse.json();

  const currentSleepScore: Number = result.data[1].score;

  return res.status(200).json({
    todaysScore: currentSleepScore,
  });
};
