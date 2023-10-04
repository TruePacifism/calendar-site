import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import styles from "./ModalAnimalChart.module.css";
import { PolarArea } from "react-chartjs-2";
import { ChartData, RadialLinearScale } from "chart.js";
import { Point } from "chart.js/dist/core/core.controller";
import { Chart as ChartJS } from "chart.js";
import monkey from "../../../images/animals/monkey-gb.jpg";
import ModalHeading from "../ModalHeading/ModalHeading";

// type propsType = {
//     data:
// }
ChartJS.register(RadialLinearScale);

type chartDataType = ChartData<"polarArea", (number | Point)[], unknown>;

const labels = ["Red", "Orange", "Yellow", "Green", "Blue"];

export default function ModalAnimalChart() {
  const [data, setData]: [
    chartDataType,
    Dispatch<SetStateAction<chartDataType>>
  ] = useState();
  useEffect(() => {
    const randomData = [1, 2, 3, 4, 5].map((number) => Math.random());
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
        <li className={styles.animalsItem}>
          <img src={monkey} alt="" className={styles.animalImage} />
          <span className={styles.animalName}>
            Обезьяна
            <br />
            70%
          </span>
        </li>
        <li className={styles.animalsItem}>
          <img src={monkey} alt="" className={styles.animalImage} />
          <span className={styles.animalName}>
            Обезьяна
            <br />
            70%
          </span>
        </li>
        <li className={styles.animalsItem}>
          <img src={monkey} alt="" className={styles.animalImage} />
          <span className={styles.animalName}>
            Обезьяна
            <br />
            70%
          </span>
        </li>
        <li className={styles.animalsItem}>
          <img src={monkey} alt="" className={styles.animalImage} />
          <span className={styles.animalName}>
            Обезьяна
            <br />
            70%
          </span>
        </li>
      </ul>
    </div>
  );
}
