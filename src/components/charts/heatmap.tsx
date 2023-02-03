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
        },

        xaxis: {
          categories: period,
          labels: { show: false },
          tickAmount: dateRange === "thisYear" ? 12 : 7,
          tooltip: {
            enabled: true,
            formatter: undefined,
            offsetY: 0,
          },
        },
        tooltip: { fillSeriesColor: true, theme: "dark" },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            radius: 0,
            useFillColorAsStroke: false,
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 69,
                  name: "Pay Attention",
                  color: "#ea4c33",
                },
                {
                  from: 70,
                  to: 84,
                  name: "Good",
                  color: "#e1de1a",
                },
                {
                  from: 85,
                  to: 100,
                  name: "Optimal",
                  color: "#2fbe44",
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
