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

const labels = [
  "Бык",
  "Тигр",
  "Кролик",
  "Дракон",
  "Змея",
  "Лошадь",
  "Коза",
  "Обезьяна",
  "Петух",
  "Собака",
  "Свинья",
  "Крыса",
];
const getAnimalName = (animal: string): string => {
  switch (animal) {
    case "BULL":
      return "Бык";
    case "TIGER":
      return "Тигр";
    case "RABBIT":
      return "Кролик";
    case "DRAGON":
      return "Дракон";
    case "SNAKE":
      return "Змея";
    case "HORSE":
      return "Лошадь";
    case "GOAT":
      return "Коза";
    case "MONKEY":
      return "Обезьяна";
    case "ROOSTER":
      return "Петух";
    case "DOG":
      return "Собака";
    case "PIG":
      return "Свинья";
    case "RAT":
      return "Крыса";
  }
};

export default function AnimalChart({ chartData }: propsType) {
  const [data, setData]: [dataType, Dispatch<SetStateAction<dataType>>] =
    useState();
  useEffect(() => {
    const data = labels.map(
      (label) =>
        Object.entries(chartData).find(
          ([key, value]) => getAnimalName(key) === label
        )[1]
    );
    setData({
      labels: labels,
      datasets: [
        {
          label: "Dataset 1",
          data: data,
          borderWidth: 1,
          backgroundColor: [
            Colors.LIGHT_BLUE.mainHex,
            Colors.LIGHT_BLUE.mainHex,
            Colors.LIGHT_GREEN.mainHex,
            Colors.LIGHT_GREEN.mainHex,
            Colors.LIGHT_GREEN.mainHex,
            Colors.RED.mainHex,
            Colors.YELLOW.mainHex,
            Colors.YELLOW.mainHex,
            Colors.PINK.mainHex,
            Colors.PURPLE.mainHex,
            Colors.LIGHT_BLUE.mainHex,
            Colors.LIGHT_BLUE.mainHex,
          ],
        },
      ],
    });
  }, [chartData]);
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
