import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import styles from "./AnimalChart.module.css";
import { PolarArea } from "react-chartjs-2";
import { ChartData, RadialLinearScale } from "chart.js";
import { Point } from "chart.js/dist/core/core.controller";
import { Chart as ChartJS } from "chart.js";
import { Colors } from "../../utils/enums";
import { chartDataType } from "../../utils/types";
import { ReactComponent as ChartBack } from "../../images/animal-chart-back.svg";
import getColorByAnimalElement from "../../utils/getColorByAnimal";

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
          borderWidth: 0,
          backgroundColor: labels.map(
            (label) => getColorByAnimalElement(label.toLowerCase()).mainHex
          ),
        },
      ],
    });
  }, [chartData]);
  return (
    <div className={styles.container}>
      <ChartBack className={styles.chartBack} />
      <ul className={styles.chartAnimalNames}>
        {labels.map((label, idx) => {
          const angle = 90 + idx * (360 / labels.length); // Вычисляем угол для каждого элемента
          const radianAngle = (angle * Math.PI) / 180; // Переводим угол в радианы
          const x = 50 + 50 * Math.cos(radianAngle); // Рассчитываем координату X
          const y = 50 + 50 * Math.sin(radianAngle); // Рассчитываем координату Y

          return (
            <li
              key={idx}
              className={styles.chartAnimalName}
              style={{
                position: "absolute",
                top: `${y}%`,
                left: `${x}%`,
                fontSize: 8,
                color: "white",
                zIndex: 100,
                transform: `translate(-50%, -50%) rotate(${angle}deg) scale(${
                  idx >= labels.length / 2 ? -100 : 100
                }%, ${idx >= labels.length / 2 ? -100 : 100}%)`, // Поворачиваем текст
              }}
            >
              {label}
            </li>
          );
        })}
      </ul>
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
                enabled: false,
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
