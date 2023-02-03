import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export const useReadiness = (activeDateRange: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/readiness/${activeDateRange}`,
    fetcher
  );
  return {
    readiness: data,
    readinessLoading: isLoading,
    readinessError: error,
  };
};
