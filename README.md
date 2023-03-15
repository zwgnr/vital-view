<div align="center">
<img src='./public/vitalview.png' width="150" height="150"/> 
<h1>Vital View</h1>
</div>
<h3 align="center">An Analytics Dashboard for your 
  <span>
    <a href='https://ouraring.com/'>Oura Ring.</a>
  </span>
</h3>
<div align="center">

  <a href='https://vitalview.app'>![Website](	https://img.shields.io/badge/VitalView-000000?style=for-the-badge)
  </a>
</div>

<p align="center">
<img src='public/vitalviewpreview.png' width="100%" height="100%"/> 
</p>

# Features
🛡️ Secure OAuth2 Login via your Oura Account.

🕑 Multi Time Frame. Today, Last 7 Days, Last 30 Days, This Year.

📈 Trends chart to see your stats over a period of time.

🥅 Score Board Heatmap to view your scores and see them ranked (Pay Attention, Good, Optimal).

🍩 Donut Chart to view Sleep Stages and Activity Zone time.

🌙 Light/Dark Mode.

📱 Responsive mobile support!

# Contributing
If you would like to contribute to this project, please start a discussion and/or submit a PR!

* You will need an Oura Client ID & Secret. These can be obtained from https://cloud.ouraring.com/docs
* Add the following as a redirect URI http://localhost:3000/api/auth/callback/oura


To develop locally, fork the repo and setup an .env.local with the following config.

```
# Next Auth
# You can generate the secret via 'openssl rand -base64 32' on Linux
# More info: https://next-auth.js.org/configuration/options#secret

NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET
NEXTAUTH_URL=http://localhost:3000/

# Next Auth Oura Provider
OURA_CLIENT_ID=YOUR_CLIENT_ID
OURA_CLIENT_SECRET=YOUR_CLIENT_SECRET
```
then

```
pnpm i 
pnpm dev
```
------

<div align="center">

<a href='https://www.buymeacoffee.com/zachxwagner'>![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)</a>
<p>
</div>


