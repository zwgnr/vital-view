import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        //token.id = profile.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken;
      //  session.user.id = token.id;
      return session;
    },
  },
  providers: [
    {
      id: "oura",
      name: "Oura",
      type: "oauth",
      checks: "state",
      authorization: {
        url: "https://cloud.ouraring.com/oauth/authorize",
        params: {
          scope: "email personal daily heartrate workout tag session",
          response_type: "code",
          redirect_uri: "http://localhost:3000/api/auth/callback/oura",
        },
      },
      token: {
        url: "https://api.ouraring.com/oauth/token",
      },
      userinfo:
        "https://api.ouraring.com/v2/usercollection/personal_info?start_date=2022-11-01&end_date=2022-12-01",
      clientId: process.env.OURA_CLIENT_ID,
      clientSecret: process.env.OURA_CLIENT_SECRET,

      profile(profile) {
        return {
          id: profile.email,
          email: profile.email,
        };
      },
    },
  ],
};

export default NextAuth(authOptions);
