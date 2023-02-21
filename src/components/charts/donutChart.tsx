import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type DonutChart = {
  enabled: boolean;
  data: number[];
  labels: string[];
};

export const DonutChart = (props: DonutChart) => {
  const { enabled, data, labels } = props;
  const { theme, setTheme } = useTheme();
  return (
    <ApexChart
      width="100%"
      height="100%"
      options={{
        colors: ["#4f46e5", "#c7d2fe", "#94a3b8"],
        dataLabels: {
          enabled: enabled ? true : false,
        },
        markers: {
          size: [0, 0],
        },
        legend: {
          position: "right",
        },
        labels: [...labels],
        chart: {
          id: "main-chart",
          toolbar: { show: false },
          foreColor: theme === "dark" ? "white" : "black",
          zoom: {
            enabled: false,
          },
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            },
          },
        },
        xaxis: {
          categories: [""],
          axisTicks: { show: false },
        },
        grid: {
          yaxis: { lines: { show: false } },
          xaxis: { lines: { show: false } },
        },
        tooltip: { fillSeriesColor: true },
      }}
      series={data}
      type="donut"
    />
  );
};
