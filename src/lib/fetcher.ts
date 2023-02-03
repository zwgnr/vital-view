export const fetcher = async (path: any) => {
  const res = await fetch(path);
  return res.json();
};
