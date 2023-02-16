import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { type BarChartData } from "../../types/sharedTypes";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type BarChart = {
  enabled: boolean;
  data: BarChartData[];
};

export const BarChart = (props: BarChart) => {
  const { enabled, data } = props;
  const { theme, setTheme } = useTheme();
  return (
    <ApexChart
      width="100%"
      height="90%"
      options={{
        colors: [
          "#2563eb",
          "#93c5fd",
          "#dbeafe",
        ],
        dataLabels: {
          enabled: enabled ? true : false,
        },
        markers: {
          size: [0, 0],
        },
        chart: {
          id: "main-chart",
          foreColor: theme === "dark" ? "white" : "black",
          zoom: {
            enabled: false,
          },
        },
        xaxis: {
          categories: [""],
        },
        grid: {
          yaxis: { lines: { show: false } },
        },
        tooltip: { fillSeriesColor: true },
      }}
      series={data}
      type="bar"
    />
  );
};
