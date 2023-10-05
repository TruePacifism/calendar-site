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
const labels = [
  "1",
  "2",
  "1",
  "2",
  "1",
  "2",
  "1",
  "1",
  "2",
  "1",
  "2",
  "1",
  "2",
  "1",
];

export default function CardLineChart() {
  const [data, setData]: [
    chartDataType,
    Dispatch<SetStateAction<chartDataType>>
  ] = useState();
  useEffect(() => {
    const randomData = [
      1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6,
    ].map((number) => Math.random() * 1000);
    setData({
      labels: labels,
      datasets: [
        {
          data: randomData,
          fill: false,
          borderColor: "#FFFFFF",
          tension: 0.5,
          backgroundColor: chartBackgroundColor,
        },
      ],
    });
  }, []);
  return (
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
  );
}
