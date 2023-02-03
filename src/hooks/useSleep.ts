import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export const useSleep = (activeDateRange: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/sleep/${activeDateRange}`,
    fetcher
  );
  return {
    sleep: data,
    sleepLoading: isLoading,
    sleepError: error,
  };
};
