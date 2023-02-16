import type { ManipulateType } from "dayjs";

export const historyTimes: string[] = [
  "1 Day",
  "7 Days",
  "2 Weeks",
  "1 Month",
  "3 Months",
  "6 Months",
  "YTD",
  "1 Year",
  "3 Years",
  "5 Years",
];

export const historyTimeMap: { [key: string]: [number, ManipulateType] } = {
  "1 Day": [1, "day"],
  "7 Days": [7, "days"],
  "2 Weeks": [2, "weeks"],
  "1 Month": [1, "month"],
  "3 Months": [3, "months"],
  "6 Months": [6, "months"],
  "1 Year": [1, "year"],
  "3 Years": [3, "years"],
  "5 Years": [5, "years"],
};

// https://docs.coinapi.io/market-data/rest-api/exchange-rates#timeseries-periods
// How frequent the data is
export const resolutionIdentifiers: string[] = [
  "10 Minutes",
  "1 Hour",
  "1 Day",
  "1 Week",
  "1 Month",
];

export const resolutionIdentifiersMap: { [key: string]: string } = {
  "10 Minutes": "10m",
  "1 Hour": "1h",
  "1 Day": "24h",
  "1 Week": "1w",
  "1 Month": "1month",
};
