import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export const useActivity = (activeDateRange: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/activity/${activeDateRange}`,
    fetcher
  );
  return {
    activity: data,
    activityLoading: isLoading,
    activityError: error,
  };
};
