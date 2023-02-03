import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export const useDailySleep = (activeDateRange: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/dailySleep/${activeDateRange}`,
    fetcher
  );
  return {
    dailySleep: data,
    dailySleepLoading: isLoading,
    dailySleepError: error,
  };
};
