import dayjs from "dayjs";
import useFetch from "./useFetch";
import {
  historyTimeMap,
  resolutionIdentifiersMap,
} from "../utils/constants/timeConstants";
import { apiUrl } from "../utils/constants/api";
import { useEffect, useState } from "react";
import addQueryParams from "../utils/helpers/addQueryParams";
// Provides chart data for base asset against quote asset
// IE --> BTC price in terms of USD

// TODO: response type

export default function useCryptoPrices(
  asset: string = "BTC",
  resolution: string = "1 Day",
  timePeriod: string = "1 Year"
) {
  const [priceHistoryUrl, setPriceHistoryUrl] = useState(() =>
    createPriceHistoryUrl(asset, resolution, timePeriod)
  );
  useEffect(() => {
    setPriceHistoryUrl(createPriceHistoryUrl(asset, resolution, timePeriod));
  }, [asset, resolution, timePeriod]);

  return useFetch(priceHistoryUrl);
}

function createPriceHistoryUrl(
  asset: string,
  resolution: string,
  timePeriod: string
): string {
  const until = dayjs();
  let since;
  if (timePeriod === "YTD") {
    since = until.startOf("year");
  } else {
    const [amount, unit] = historyTimeMap[timePeriod]; //Fix for typescript
    since = until.subtract(amount, unit);
  }
  console.log(resolution, resolutionIdentifiersMap[resolution]);
  resolution = resolutionIdentifiersMap[resolution];

  const createdUrl = addQueryParams(apiUrl + "/metrics/prices", {
    asset,
    resolution,
    since: since.unix(),
    until: until.unix(),
  });
  console.log(createdUrl);
  return createdUrl;
}
