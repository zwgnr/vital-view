import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export type TrendChartType = {
  enabled: boolean;
  period: any;
  dateRange: string;
  name: string;
  data: number[];
};

export const TrendChart = (props: TrendChartType) => {
  const { dateRange, enabled, name, data, period } = props;
  const { theme, setTheme } = useTheme();
  return (
    <ApexChart
      width="100%"
      height="100%"
      options={{
        //fill: {
        //  type: "gradient",
        //  gradient: {
        //    shade: "dark",
        //    gradientToColors: ["#f5c1ff"],
        //    shadeIntensity: 1,
        //    type: "vertical",
        //    opacityFrom: 1,
        //    opacityTo: .5,
        //    stops: [0, 100, 100, 100 ],
        //  },
       // },
        dataLabels: {
          enabled: enabled ? true : false,
        },
        stroke: {
          curve: "smooth",
          dashArray: [0, 6],
          width: [4, 2],
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
        colors: ['#3b82f6'],
        xaxis: {
          categories: period,
          tickAmount: dateRange === "thisYear" ? 12 : 7,
        },
        grid: {
          yaxis: { lines: { show: false } },
        },
        tooltip: { theme: "dark", x: { show: false } },
      }}
      series={[
        {
          name: name,
          data: data,
        },
      ]}
      type="line"
    />
  );
};
