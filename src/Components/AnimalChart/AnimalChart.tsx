import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import styles from "./AnimalChart.module.css";
import { PolarArea } from "react-chartjs-2";
import { ChartData, RadialLinearScale } from "chart.js";
import { Point } from "chart.js/dist/core/core.controller";
import { Chart as ChartJS } from "chart.js";
import { Colors } from "../../utils/enums";
import { chartDataType } from "../../utils/types";
ChartJS.register(RadialLinearScale);

type propsType = {
  chartData: chartDataType;
};

type dataType = ChartData<"polarArea", (number | Point)[], unknown>;

const labels = ["Red", "Orange", "Yellow", "Green", "Blue"];
export default function AnimalChart({ chartData }: propsType) {
  const [data, setData]: [dataType, Dispatch<SetStateAction<dataType>>] =
    useState();
  useEffect(() => {
    const data = Object.values(chartData);
    setData({
      labels: labels,
      datasets: [
        {
          label: "Dataset 1",
          data: data,
          borderWidth: 1,
          backgroundColor: [
            Colors.LIGHT_BLUE.hex,
            Colors.LIGHT_BLUE.hex,
            Colors.LIGHT_GREEN.hex,
            Colors.LIGHT_GREEN.hex,
            Colors.LIGHT_GREEN.hex,
            Colors.RED.hex,
            Colors.YELLOW.hex,
            Colors.YELLOW.hex,
            Colors.PINK.hex,
            Colors.PURPLE.hex,
            Colors.LIGHT_BLUE.hex,
            Colors.LIGHT_BLUE.hex,
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
