import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export const Email = () => {
  const { data, error } = useSWR("api/info/", fetcher);
  if (error) {
    return "Error Loading";
  }
  if (!data) {
    return "Loading...";
  }
  return data.email;
};
