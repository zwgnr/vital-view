import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

import { type HeatMapData } from "../../types/sharedTypes";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type HeatmapChartType = {
  enabled: boolean;
  period: any;
  dateRange: string;
  data: HeatMapData[];
};

export const Heatmap = (props: HeatmapChartType) => {
  const { enabled, period, dateRange, data } = props;
  const { theme, setTheme } = useTheme();
  return (
    <ApexChart
      width="100%"
      height="100%"
      options={{
        dataLabels: {
          enabled: enabled ? true : false,
        },
        chart: {
          id: "heatmap",
          foreColor: theme === "dark" ? "white" : "black",
          toolbar: { show: false },
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            },
          },
        },

        xaxis: {
          categories: period,
          labels: { show: false },
          tickAmount: dateRange === "thisYear" ? 12 : 7,
          tooltip: { enabled: true },
          axisTicks: { show: false },
        },
        grid: {
          yaxis: { lines: { show: false } },
          xaxis: { lines: { show: false } },
        },
        stroke: { colors: [theme === "light" ? "white" : "#1e293b"], width: 6 },
        tooltip: {
          fillSeriesColor: true,
          theme: "dark",
          x: {
            formatter(val, opts) {
              if (dateRange === "today") {
                return val.toString();
              }
              return val.toString().slice(0, 5);
            },
          },
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            radius: 5,
            useFillColorAsStroke: false,
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 69,
                  name: "Pay Attention",
                  color: "#94a3b8",
                },
                {
                  from: 70,
                  to: 84,
                  name: "Good",
                  color: "#818cf8",
                },
                {
                  from: 85,
                  to: 100,
                  name: "Optimal",
                  color: "#4f46e5",
                },
              ],
            },
          },
        },
      }}
      series={data}
      type="heatmap"
    />
  );
};
