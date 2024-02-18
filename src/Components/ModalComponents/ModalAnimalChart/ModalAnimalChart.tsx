import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import styles from "./ModalAnimalChart.module.css";
import { PolarArea } from "react-chartjs-2";
import { ChartData, RadialLinearScale } from "chart.js";
import { Point } from "chart.js/dist/core/core.controller";
import { Chart as ChartJS } from "chart.js";
import bull from "../../../images/animals/bull-gb.jpg";
import tiger from "../../../images/animals/tiger-gb.jpg";
import rabbit from "../../../images/animals/cat-gb.jpg";
import dragon from "../../../images/animals/dragon-gb.jpg";
import snake from "../../../images/animals/snake-gb.jpg";
import horse from "../../../images/animals/horse-gb.jpg";
import goat from "../../../images/animals/goat-gb.jpg";
import monkey from "../../../images/animals/monkey-gb.jpg";
import rooster from "../../../images/animals/rooster+.jpg";
import dog from "../../../images/animals/dog-gn.jpg";
import pig from "../../../images/animals/pig+.jpg";
import rat from "../../../images/animals/rat-gb.jpg";
import ModalHeading from "../ModalHeading/ModalHeading";
import { Colors } from "../../../utils/enums";
import { chartDataType } from "../../../utils/types";
import { ReactComponent as ChartBack } from "../../../images/animal-chart-back.svg";
import getColorByAnimalElement from "../../../utils/getColorByAnimal";
import AnimalPic from "../../AnimalElementPic/AnimalPic";

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

const getAnimalImage = (animal: string): string => {
  switch (animal) {
    case "BULL":
      return bull;
    case "TIGER":
      return tiger;
    case "RABBIT":
      return rabbit;
    case "DRAGON":
      return dragon;
    case "SNAKE":
      return snake;
    case "HORSE":
      return horse;
    case "GOAT":
      return goat;
    case "MONKEY":
      return monkey;
    case "ROOSTER":
      return rooster;
    case "DOG":
      return dog;
    case "PIG":
      return pig;
    case "RAT":
      return rat;
  }
};

export default function ModalAnimalChart({ chartData }: propsType) {
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
          label: "",
          data: data,
          borderWidth: 0,
          borderColor: "black",
          backgroundColor: labels.map(
            (label) => getColorByAnimalElement(label.toLowerCase()).mainHex
          ),
        },
      ],
    });
  }, [chartData]);
  return (
    <div className={styles.container}>
      <ModalHeading text="ЖИВОТНЫЕ" />
      <div className={styles.chart}>
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
                  fontSize: 15,
                  zIndex: 100,
                  fontWeight: 900,
                  textAlign: "left",
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
              borderColor: "black",
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
                  suggestedMax: 5,
                },
              },
            }}
          />
        )}
      </div>
      <ul className={styles.animalsList}>
        {Object.entries(chartData)
          .sort((a, b) => b[1] - a[1])
          .map(
            ([name, value], idx) =>
              value > 0 && (
                <li key={idx} className={styles.animalsItem}>
                  <AnimalPic
                    animal={{
                      name: getAnimalName(name).toLowerCase(),
                      isBlack: false,
                      isGood: false,
                    }}
                    doneFor="Calculator"
                  />
                  <span className={styles.animalName}>
                    <span className={styles.animalValue}>{value + "%"}</span>
                  </span>
                </li>
              )
          )}
      </ul>
    </div>
  );
}
