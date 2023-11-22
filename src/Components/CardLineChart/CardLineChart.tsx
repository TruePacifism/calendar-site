import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import styles from "./CardLineChart.module.css";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  ChartData,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import { Point } from "chart.js/dist/core/core.controller";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { chartBackgroundColor, miniAccentColor } from "../../utils/vars";
import { lineChartDataType } from "../../utils/types";
import CustomCheckBoxGroup from "../CustomCheckBoxGroup";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const customBackgroundPlugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (
    chart: { width?: any; height?: any; ctx?: any },
    args: any,
    options: { color: string }
  ) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = chartBackgroundColor;
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};
type chartDataType = ChartData<"line", (number | Point)[], unknown>;
type propsType = {
  chartData: lineChartDataType;
};
type viewType = "Неделя" | "Месяц" | "Год";

export default function CardLineChart({ chartData }: propsType) {
  const [data, setData]: [
    chartDataType,
    Dispatch<SetStateAction<chartDataType>>
  ] = useState();
  const [view, setView]: [viewType, Dispatch<SetStateAction<viewType>>] =
    useState();
  useState();
  useEffect(() => {
    let data: number[] = [];
    let labels: string[] = [];
    console.log(view);
    if (!view) {
      setView("Год");
    }
    switch (view) {
      case "Год":
        labels = chartData.year.map((data) => data.date.toString());
        data = chartData.year.map((data) => data.value);
        break;
      case "Месяц":
        labels = chartData.month.map((data) => data.date.toString());
        data = chartData.month.map((data) => data.value);
        break;
      case "Неделя":
        labels = chartData.day.map((data) => data.date.toString());
        data = chartData.day.map((data) => data.value);
        break;
      default:
        return;
    }
    setData({
      labels: labels,
      datasets: [
        {
          data,
          fill: false,
          borderColor: "#FFFFFF",
          tension: 0.5,
          backgroundColor: chartBackgroundColor,
        },
      ],
    });
    console.log(labels);
    console.log(data);
  }, [view]);
  return (
    <>
      <div className={styles.chartTitleBox}>
        <span className={styles.chartTitle}>ГРАФИК</span>
        <CustomCheckBoxGroup
          checkboxesInfo={[
            { title: "Неделя", value: "Неделя" },
            { title: "Месяц", value: "Месяц" },
            { title: "Год", value: "Год" },
          ]}
          onChange={(e) => {
            const { value } = e.target;
            if (value === "Неделя" || value === "Месяц" || value === "Год") {
              setView(value);
            }
          }}
          className={styles.chartCheckboxes}
          defaultCheckedIndex={2}
        />
      </div>
      <div className={styles.container}>
        {data && (
          <Line
            data={data}
            className={styles.chart}
            width="auto"
            options={{
              backgroundColor: chartBackgroundColor,
              plugins: {
                colors: {},
                legend: {
                  display: false,
                },
              },
              elements: {
                point: {
                  radius: 0,
                },
              },
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                y: {
                  display: false,
                },
                x: {
                  offset: true,
                  title: {
                    padding: 10,
                  },
                  max: 7,

                  backgroundColor: miniAccentColor,
                  clip: true,
                  grid: {
                    drawTicks: false,

                    color: "#FFFFFF",
                  },
                },
              },
            }}
            plugins={[customBackgroundPlugin]}
          />
        )}
      </div>
    </>
  );
}
