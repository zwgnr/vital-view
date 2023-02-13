import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ message: "You must be logged in to access this content" });
  } else {
    const token = session?.accessToken;
    const url = `https://api.ouraring.com/v2/usercollection/personal_info`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const ouraResponse = await fetch(url, { headers });
    const result = await ouraResponse.json();
    const personalInfo = result;

    return res
      .status(200)
      .json({ personalInfo: result, email: personalInfo.email });
  }
};
