import { useMemo, useState } from "react";
import type { Props } from "react-apexcharts";
import ChartCrypto from "./components/ChartCrypto";
import useFetch from "./hooks/useFetch";
import useCryptoPrices from "./hooks/useCryptoPrices";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  historyTimes,
  historyTimeMap,
  resolutionIdentifiers,
  resolutionIdentifiersMap,
} from "./utils/constants/timeConstants";
import { apiUrl } from "./utils/constants/api";

function App() {
  const [baseAsset, setBaseAsset] = useState("BTC"); // state will be asset symbol
  const [resolution, setResolution] = useState("1 Day");
  const [timePeriod, setTimePeriod] = useState("1 Year");
  const [chartType, setChartType] = useState<Props["type"]>("line");
  const [assetList, assetListLoading, assetListError] = useFetch(
    apiUrl + "/assets"
  );
  const [priceData, priceDataIsLoading, priceDataError] = useCryptoPrices(
    baseAsset,
    resolution,
    timePeriod
  );

  function handleChange(
    setState: React.Dispatch<React.SetStateAction<string>>
  ) {
    return (e: any) => setState(e.target.value);
  }

  console.log(priceData);

  // TODO: Move these into Main component return later
  if (assetListError) return <ErrorBoundary error={assetListError} />;
  if (assetListLoading) return <LoadingSpinner />;

  return (
    <div className="h-screen bg-black text-neutral-200">
      <nav className="flex items-center justify-center p-8 border-neutral-400 border-solid border-2">
        <h3>Nav Bar</h3>
      </nav>
      <div className="flex items-start justify-around m-6 p-2">
        <div className="bg-zinc-600 min-w-[20rem]">
          {/* ASSET SELECTORS */}
          <select
            className="bg-zinc-900 p-2"
            id="base-asset-selector"
            value={baseAsset}
            onChange={handleChange(setBaseAsset)}
          >
            {assetList.map((assetObj: any) => (
              <option value={assetObj.symbol} key={assetObj.symbol}>
                {assetObj.symbol} {assetObj.name}
              </option>
            ))}
          </select>
        </div>

        {/* TIME SELECTORS */}
        <div className="">
          <select
            className="bg-zinc-900"
            id="resolution-selector"
            value={resolution}
            onChange={handleChange(setResolution)}
          >
            {resolutionIdentifiers.map((el) => (
              <option value={el} key={`res-${el}`}>
                {el}
              </option>
            ))}
          </select>

          <select
            className="bg-zinc-900"
            id="period-selector"
            value={timePeriod}
            onChange={handleChange(setTimePeriod)}
          >
            {historyTimes.map((el) => (
              <option value={el} key={`period-${el}`}>
                {el}
              </option>
            ))}
          </select>

          {priceDataError ? (
            <ErrorBoundary error={priceDataError} />
          ) : priceDataIsLoading ? (
            <LoadingSpinner />
          ) : (
            <ChartCrypto data={priceData} type={chartType} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
