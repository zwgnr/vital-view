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
        colors: ["#4f46e5", "#c7d2fe", "#94a3b8"],
        dataLabels: {
          enabled: enabled ? true : false,
        },
        markers: {
          size: [0, 0],
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },

        chart: {
          id: "main-chart",
          toolbar: { show: false },
          foreColor: theme === "dark" ? "white" : "black",
          stacked: true,
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
