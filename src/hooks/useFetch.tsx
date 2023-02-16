import { useEffect, useState } from "react";
import addQueryParams from "../utils/helpers/addQueryParams";

export default function useFetch(
  url: string,
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH" = "GET",
  queryParams?: { [index: string]: string | number | boolean }
) {
  const [data, setData] = useState<any>([]); // TODO: Correct TSC typing
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null); // TODO: Correct TSC typing

  useEffect(() => {
    // Fix later to prevent race conditions
    const fullUrl = queryParams ? addQueryParams(url, queryParams) : url;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(fullUrl, {
          method,
        });

        if (!response.ok) {
          throw new Error(
            `Problem retrieving data: ${response.status}-${response.statusText}`
          );
        }
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (err) {
        console.warn(err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, queryParams]);

  return [data, isLoading, error];
}
