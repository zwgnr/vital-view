import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getToken({ req });
  const token = response?.accessToken;
  const url = `https://api.ouraring.com/v2/usercollection/personal_info`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const ouraResponse = await fetch(url, { headers });
  const result = await ouraResponse.json();
  const personalInfo = result;

  //console.log("getSleepAuthToken", token);
  //console.log("getInfo", personalInfo);
  return res
    .status(200)
    .json({ personalInfo: result, email: personalInfo.email });
};
