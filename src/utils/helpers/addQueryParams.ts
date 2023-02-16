// May need to add some regex if passing ISO time into {new URLSearchParams()}
// Will need to verify it is producing correct URL in that case
export default function addQueryParams(
  baseUrl: string,
  queryParams: { [index: string]: string | number | boolean }
) {
  if (!queryParams) return baseUrl;
  const keys = Object.keys(queryParams);
  if (!keys.length) return baseUrl;
  const queryString =
    "?" + keys.map((key) => `${key}=${queryParams[key]}`).join("&");
  return baseUrl + queryString;
}
