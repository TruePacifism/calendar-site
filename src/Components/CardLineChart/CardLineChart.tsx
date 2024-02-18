import React, {
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
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
import { useDispatch } from "react-redux";
import { openModalAction } from "../../utils/store";
import ModalHeading from "../ModalComponents/ModalHeading/ModalHeading";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

type chartDataType = ChartData<"line", (number | Point)[], unknown>;
type propsType = {
  chartData: lineChartDataType;
  backgroundColor: string;
};
type viewType = "Неделя" | "Месяц" | "Год";
const viewsArray: viewType[] = ["Неделя", "Месяц", "Год"];
const Modal = ({
  backgroundColor,
  dataArray,
}: {
  backgroundColor: string;
  dataArray: {
    Неделя?: ChartData<"line", (number | Point)[], unknown>;
    Месяц?: ChartData<"line", (number | Point)[], unknown>;
    Год?: ChartData<"line", (number | Point)[], unknown>;
    Жизнь?: ChartData<"line", (number | Point)[], unknown>;
  };
}) => {
  const [openedViews, setOpenedViews]: [
    viewType[],
    Dispatch<SetStateAction<viewType[]>>
  ] = useState([]);
  return (
    <div className={styles.modalContainer}>
      <ModalHeading text="ГРАФИК" />
      <ul className={styles.modalViews}>
        {(function f() {
          return viewsArray.map((view) => (
            <li className={styles.modalViewContainer}>
              <button
                className={`${styles.chartCheckbox} ${
                  openedViews.includes(view) ? styles.selected : ""
                }`}
                onClick={() => {
                  setOpenedViews((oldViews) => {
                    return oldViews.includes(view)
                      ? oldViews.filter((v) => v !== view)
                      : [...oldViews, view];
                  });
                }}
              >
                {view}
              </button>
              {openedViews.includes(view) && (
                <div className={styles.container}>
                  <Line
                    data={dataArray[view]}
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
                          display: true,
                          suggestedMin: -6,
                          suggestedMax: 6,
                          grid: {
                            drawOnChartArea: true,
                            color(ctx, options) {
                              if (ctx.tick.value === 0) {
                                return "white";
                              } else {
                                return "";
                              }
                            },
                          },
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
                    plugins={[customBackgroundPlugin(backgroundColor)]}
                  />
                </div>
              )}
            </li>
          ));
        })()}
      </ul>
    </div>
  );
};
const customBackgroundPlugin = (backgroundColor: string) => ({
  id: "customCanvasBackgroundColor",
  beforeDraw: (
    chart: { width?: any; height?: any; ctx?: any },
    args: any,
    options: { color: string }
  ) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
});

export default function CardLineChart({
  chartData,
  backgroundColor,
}: propsType) {
  const dispatch = useDispatch();
  const [view, setView]: [viewType, Dispatch<SetStateAction<viewType>>] =
    useState("Неделя" as viewType);
  const handleClick = useCallback(() => {
    dispatch(
      openModalAction(
        <Modal dataArray={dataArray} backgroundColor={backgroundColor} />
      )
    );
  }, [dispatch]);
  const dataArray = useMemo(() => {
    const object: {
      Неделя?: ChartData<"line", (number | Point)[], unknown>;
      Месяц?: ChartData<"line", (number | Point)[], unknown>;
      Год?: ChartData<"line", (number | Point)[], unknown>;
      Жизнь?: ChartData<"line", (number | Point)[], unknown>;
    } = {};
    viewsArray.forEach((v) => {
      let data: number[] = [];
      let labels: string[] = [];
      switch (v) {
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
      object[v] = {
        labels: labels,
        datasets: [
          {
            data,
            fill: false,
            borderColor: "#FFFFFF",
            tension: 0.5,
            backgroundColor,
          },
        ],
      };
    });
    return object;
  }, [backgroundColor, chartData]);

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
        {dataArray && (
          <Line
            onClick={handleClick}
            data={dataArray[view]}
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
                  display: true,
                  suggestedMin: -6,
                  suggestedMax: 6,
                  grid: {
                    drawOnChartArea: true,
                    color(ctx, options) {
                      if (ctx.tick.value === 0) {
                        return "white";
                      } else {
                        return "";
                      }
                    },
                  },
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
            plugins={[customBackgroundPlugin(backgroundColor)]}
          />
        )}
      </div>
    </>
  );
}
