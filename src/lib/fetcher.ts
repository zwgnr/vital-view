export const fetcher = async (path: RequestInfo | URL) => {
  const res = await fetch(path);
  return res.json();
};
