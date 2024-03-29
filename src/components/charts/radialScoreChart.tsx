import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export type RadialScoreChartProps = {
  label: string[];
  data: number[];
};

export const RadialScoreChart = (props: RadialScoreChartProps) => {
  const { label, data } = props;
  const { theme } = useTheme();
  const todaysScore = data[0] ?? 0;

  const fillColor = () => {
    if (todaysScore >= 85) return ["#4f46e5"];
    if (todaysScore <= 84 && todaysScore >= 71) return ["#818cf8"];
    if (todaysScore <= 70) return ["#94a3b8"];
  };

  return (
    <>
      <ApexChart
        width="80%"
        height="80%"
        options={{
          plotOptions: {
            radialBar: {
              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  show: true,
                  color: theme === "dark" ? "#ffffff" : "#000000",
                  fontSize: "17px",
                },
                value: {
                  formatter: function (val: number) {
                    return val.toString();
                  },
                  color: theme === "dark" ? "#ffffff" : "#000000",
                  fontSize: "36px",
                  show: true,
                },
              },
              startAngle: -135,
              endAngle: 225,
              hollow: {
                margin: 0,
                size: "70%",
                background: "",
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: "front",
                dropShadow: {
                  enabled: true,
                  top: 3,
                  left: 0,
                  blur: 4,
                  opacity: 0.24,
                },
              },
              track: {
                background: "#6d6868",
                strokeWidth: "67%",
                margin: 0,
              },
            },
          },
          chart: {
            id: "Todays Score",
            sparkline: {
              enabled: true,
            },
          },
          tooltip: {
            theme: "dark",
            fixed: {
              enabled: true,
              position: "bottomLeft",
              offsetX: 0,
              offsetY: 0,
            },
          },
          fill: {
            colors: fillColor(),
          },
          labels: label,
        }}
        series={data}
        type="radialBar"
      />
      {data[0] ?? 0 < 85 ? (
        <div className="h-6 w-6"></div>
      ) : (
        <Icon
          icon="ph:crown-simple-bold"
          width={24}
          height={24}
          color="#4f46e5"
        />
      )}
    </>
  );
};
