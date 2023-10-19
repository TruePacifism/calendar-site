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
      <ModalHeading text="ЖИВОТНЫЕ" />{" "}
      <div className={styles.chart}>
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
      <ul className={styles.animalsList}>
        {Object.entries(chartData).map(
          ([name, value], idx) =>
            value > 0 && (
              <li key={idx} className={styles.animalsItem}>
                <img
                  src={getAnimalImage(name)}
                  alt=""
                  className={styles.animalImage}
                />
                <span className={styles.animalName}>
                  {getAnimalName(name)}
                  <br />
                  {value}
                </span>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
