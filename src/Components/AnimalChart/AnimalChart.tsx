import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import styles from "./AnimalChart.module.css";
import { Line, PolarArea, Radar } from "react-chartjs-2";
import { ChartData, RadialLinearScale } from "chart.js";
import { Point } from "chart.js/dist/core/core.controller";
import { Chart as ChartJS } from "chart.js";
import { chartBackgroundColor } from "../../utils/vars";
ChartJS.register(RadialLinearScale);

type chartDataType = ChartData<"polarArea", (number | Point)[], unknown>;

const labels = ["Red", "Orange", "Yellow", "Green", "Blue"];
export default function AnimalChart() {
  const [data, setData]: [
    chartDataType,
    Dispatch<SetStateAction<chartDataType>>
  ] = useState();
  useEffect(() => {
    const randomData = [1, 2, 3, 4, 5].map((number) => Math.random() * 1000);
    setData({
      labels: labels,
      datasets: [
        {
          label: "Dataset 1",
          data: randomData,
          borderWidth: 0,
          backgroundColor: [
            "rgba(255,0,255, 1)",
            "rgba(0,0,255, 1)",
            "rgba(255,0,0, 1)",
            "rgba(255,133,255, 1)",
            "rgba(133,133,255, 1)",
          ],
        },
      ],
    });
  }, []);
  return (
    <div className={styles.container}>
      {data && (
        <PolarArea
          data={data}
          className={styles.chart}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
              },
              tooltip: {
                displayColors: false,
              },
            },
            scales: {
              r: {
                display: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}
