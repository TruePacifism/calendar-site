import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Card.module.css";
import IconedCardInfoList from "../../Components/IconedCardInfoList/IconedCardInfoList";
import CustomCheckBoxGroup from "../../Components/CustomCheckBoxGroup";
import { cardInfoType } from "../../utils/types";
import CardInfo from "../../Components/CardInfo/CardInfo";
import MainElementStar from "../../Components/MainElementStar/MainElementStar";
import FallingStarsField from "../../Components/FallingStarsField/FallingStarsField";
import CardLineChart from "../../Components/CardLineChart/CardLineChart";
import PillarsInfo from "../../Components/PillarsInfo/PillarsInfo";
import AnimalChart from "../../Components/AnimalChart/AnimalChart";
import { Button, Dialog, ThemeProvider } from "@mui/material";
import { buttonTheme, modalTheme } from "../../utils/muiThemes";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import ModalIconedInfo from "../../Components/ModalComponents/ModalIconedInfo/ModalIconedInfo";
import ModalCardInfo from "../../Components/ModalComponents/ModalCardInfo/ModalCardInfo";
import ModalMainElementStar from "../../Components/ModalComponents/ModalMainElementStar/ModalMainElementStar";
import ModalFallingStars from "../../Components/ModalComponents/ModalFallingStars/ModalFallingStars";
import ModalAnimalChart from "../../Components/ModalComponents/ModalAnimalChart/ModalAnimalChart";
import ModalPillars from "../../Components/ModalComponents/ModalPillars/ModalPillars";

export default function Card(): React.JSX.Element {
  const [cardInfo, setCardInfo]: [
    cardInfoType,
    Dispatch<SetStateAction<cardInfoType>>
  ] = useState({
    id: "1c2b973d-b86f-4096-934b-0b1094d33dd5",
    name: "Евгений",
    gender: "Мужской",
    birthdate: {
      year: 2003,
      month: 0,
      day: 8,
      hour: 21,
      minute: 31,
    },
    birthcity: "Санкт-Петербург",
    year: {
      animal: {
        name: "Лошадь",
        collisions: [],
        isGood: true,
        isBlack: false,
      },
      element: {
        name: "Вода Ян",
        isGood: false,
        isBlack: false,
      },
    },
    month: {
      animal: {
        name: "Бык",
        collisions: [],
        isGood: false,
        isBlack: false,
      },
      element: {
        name: "Вода Инь",
        isGood: false,
        isBlack: false,
      },
    },
    day: {
      animal: {
        name: "Змея",
        collisions: [
          {
            secondTarget: {
              target: "рождения",
              animal: {
                name: "Свинья",
                element: {
                  name: "Вода Инь",
                },
                monthBounds: {
                  start: 312,
                  end: 340,
                },
              },
              time: "Час",
            },
            shape: "Полукруг",
            color: "Светло-Зеленый",
            kind: "Столкновение",
            description:
              "Столкновение: Змея (День рождения) - Свинья (Час рождения)",
          },
        ],
        isGood: true,
        isBlack: false,
      },
      element: {
        name: "Металл Инь",
        isGood: false,
        isBlack: false,
      },
    },
    hour: {
      animal: {
        name: "Свинья",
        collisions: [
          {
            secondTarget: {
              target: "рождения",
              animal: {
                name: "Змея",
                element: {
                  name: "Дерево Инь",
                },
                monthBounds: {
                  start: 126,
                  end: 156,
                },
              },
              time: "День",
            },
            shape: "Полукруг",
            color: "Светло-Зеленый",
            kind: "Столкновение",
            description:
              "Столкновение: Свинья (Час рождения) - Змея (День рождения)",
          },
        ],
        isGood: false,
        isBlack: false,
      },
      element: {
        name: "Земля Инь",
        isGood: true,
        isBlack: false,
      },
    },
    currentPillar: {
      year: 2021,
      month: 1,
      animal: {
        name: "Кролик",
        isGood: true,
        isBlack: false,
      },
      element: {
        name: "Дерево Инь",
        isGood: true,
        isBlack: false,
      },
      ageYear: 18,
      ageMonth: 1,
    },
    pillars: [
      {
        year: 2003,
        month: 0,
        animal: {
          name: "Бык",
          isGood: false,
          isBlack: false,
        },
        element: {
          name: "Вода Инь",
          isGood: false,
          isBlack: false,
        },
        ageYear: 0,
        ageMonth: 0,
      },
      {
        year: 2011,
        month: 1,
        animal: {
          name: "Тигр",
          isGood: false,
          isBlack: false,
        },
        element: {
          name: "Дерево Ян",
          isGood: false,
          isBlack: false,
        },
        ageYear: 8,
        ageMonth: 1,
      },
      {
        year: 2021,
        month: 1,
        animal: {
          name: "Кролик",
          isGood: false,
          isBlack: false,
        },
        element: {
          name: "Дерево Инь",
          isGood: false,
          isBlack: false,
        },
        ageYear: 18,
        ageMonth: 1,
      },
      {
        year: 2031,
        month: 1,
        animal: {
          name: "Дракон",
          isGood: false,
          isBlack: false,
        },
        element: {
          name: "Огонь Ян",
          isGood: false,
          isBlack: false,
        },
        ageYear: 28,
        ageMonth: 1,
      },
      {
        year: 2041,
        month: 1,
        animal: {
          name: "Змея",
          isGood: false,
          isBlack: false,
        },
        element: {
          name: "Огонь Инь",
          isGood: false,
          isBlack: false,
        },
        ageYear: 38,
        ageMonth: 1,
      },
      {
        year: 2051,
        month: 1,
        animal: {
          name: "Лошадь",
          isGood: false,
          isBlack: false,
        },
        element: {
          name: "Земля Ян",
          isGood: false,
          isBlack: false,
        },
        ageYear: 48,
        ageMonth: 1,
      },
      {
        year: 2061,
        month: 1,
        animal: {
          name: "Коза",
          isGood: false,
          isBlack: false,
        },
        element: {
          name: "Земля Инь",
          isGood: false,
          isBlack: false,
        },
        ageYear: 58,
        ageMonth: 1,
      },
      {
        year: 2071,
        month: 1,
        animal: {
          name: "Обезьяна",
          isGood: false,
          isBlack: false,
        },
        element: {
          name: "Металл Ян",
          isGood: false,
          isBlack: false,
        },
        ageYear: 68,
        ageMonth: 1,
      },
      {
        year: 2081,
        month: 1,
        animal: {
          name: "Петух",
          isGood: false,
          isBlack: false,
        },
        element: {
          name: "Металл Инь",
          isGood: false,
          isBlack: false,
        },
        ageYear: 78,
        ageMonth: 1,
      },
      {
        year: 2091,
        month: 1,
        animal: {
          name: "Собака",
          isGood: false,
          isBlack: false,
        },
        element: {
          name: "Вода Ян",
          isGood: false,
          isBlack: false,
        },
        ageYear: 88,
        ageMonth: 1,
      },
      {
        year: 2101,
        month: 1,
        animal: {
          name: "Свинья",
          isGood: false,
          isBlack: false,
        },
        element: {
          name: "Вода Инь",
          isGood: false,
          isBlack: false,
        },
        ageYear: 98,
        ageMonth: 1,
      },
    ],
    mainElement: {
      name: "Вода",
      animals: [
        {
          name: "Бык",
          isGood: false,
          isBlack: false,
        },
        {
          name: "Тигр",
          isGood: false,
          isBlack: false,
        },
        {
          name: "Свинья",
          isGood: false,
          isBlack: false,
        },
        {
          name: "Крыса",
          isGood: false,
          isBlack: false,
        },
      ],
      elements: [
        {
          name: "Вода Инь",
          isGood: false,
          isBlack: false,
        },
        {
          name: "Вода Ян",
          isGood: false,
          isBlack: false,
        },
      ],
    },
    cardStrength: {
      power: 4,
      powerDescription: "Сильная",
      powerfulElements: [
        {
          name: "Вода",
          animals: [
            {
              name: "Бык",
              isGood: false,
              isBlack: false,
            },
            {
              name: "Тигр",
              isGood: false,
              isBlack: false,
            },
            {
              name: "Свинья",
              isGood: false,
              isBlack: false,
            },
            {
              name: "Крыса",
              isGood: false,
              isBlack: false,
            },
          ],
          elements: [
            {
              name: "Вода Инь",
              isGood: false,
              isBlack: false,
            },
            {
              name: "Вода Ян",
              isGood: false,
              isBlack: false,
            },
          ],
        },
        {
          name: "Металл",
          animals: [
            {
              name: "Петух",
              isGood: false,
              isBlack: false,
            },
            {
              name: "Собака",
              isGood: false,
              isBlack: false,
            },
          ],
          elements: [
            {
              name: "Металл Инь",
              isGood: false,
              isBlack: false,
            },
            {
              name: "Металл Ян",
              isGood: false,
              isBlack: false,
            },
          ],
        },
      ],
      maxPower: 7,
      leader: {
        name: "Вода",
        animals: [
          {
            name: "Бык",
            isGood: false,
            isBlack: false,
          },
          {
            name: "Тигр",
            isGood: false,
            isBlack: false,
          },
          {
            name: "Свинья",
            isGood: false,
            isBlack: false,
          },
          {
            name: "Крыса",
            isGood: false,
            isBlack: false,
          },
        ],
        elements: [
          {
            name: "Вода Инь",
            isGood: false,
            isBlack: false,
          },
          {
            name: "Вода Ян",
            isGood: false,
            isBlack: false,
          },
        ],
      },
    },
    fallingStars: [
      {
        yearNumber: 6,
        monthNumber: 5,
        description: "",
        direction: "Запад",
      },
      {
        yearNumber: 2,
        monthNumber: 1,
        description: "",
        direction: "Юг",
      },
      {
        yearNumber: 4,
        monthNumber: 3,
        description: "",
        direction: "Восток",
      },
      {
        yearNumber: 5,
        monthNumber: 4,
        description: "",
        direction: "Север",
      },
      {
        yearNumber: 7,
        monthNumber: 6,
        description: "",
        direction: "Северо-Запад",
      },
      {
        yearNumber: 9,
        monthNumber: 8,
        description: "",
        direction: "Северо-Восток",
      },
      {
        yearNumber: 1,
        monthNumber: 9,
        description: "",
        direction: "Юго-Запад",
      },
      {
        yearNumber: 3,
        monthNumber: 2,
        description: "",
        direction: "Юго-Восток",
      },
      {
        yearNumber: 8,
        monthNumber: 7,
        description: "",
        direction: "Центр",
      },
    ],
    momCard: {
      id: "bcc7743b-30a0-489f-b816-bc8d0aa8635b",
      name: "Виктория",
      gender: "Женский",
      birthdate: {
        year: 1983,
        month: 11,
        day: 8,
        hour: 21,
        minute: 31,
      },
      birthcity: "Санкт-Петербург",
      year: {
        animal: {
          name: "Свинья",
          collisions: [
            {
              secondTarget: {
                target: "рождения",
                animal: {
                  name: "Свинья",
                  element: {
                    name: "Вода Инь",
                  },
                  monthBounds: {
                    start: 312,
                    end: 340,
                  },
                },
                time: "Час",
              },
              shape: "Квадрат",
              color: "Голубой",
              kind: "Самонаказание",
              description:
                "Самонаказание: Свинья (Год рождения) - Свинья (Час рождения)",
            },
          ],
          isGood: false,
          isBlack: false,
        },
        element: {
          name: "Вода Инь",
          isGood: false,
          isBlack: false,
        },
      },
      month: {
        animal: {
          name: "Крыса",
          collisions: [
            {
              secondTarget: {
                target: "рождения",
                animal: {
                  name: "Лошадь",
                  element: {
                    name: "Огонь Ян",
                  },
                  monthBounds: {
                    start: 157,
                    end: 188,
                  },
                },
                time: "День",
              },
              shape: "Полукруг",
              color: "Красный",
              kind: "Столкновение",
              description:
                "Столкновение: Крыса (Месяц рождения) - Лошадь (День рождения)",
            },
          ],
          isGood: false,
          isBlack: false,
        },
        element: {
          name: "Дерево Ян",
          isGood: true,
          isBlack: false,
        },
      },
      day: {
        animal: {
          name: "Лошадь",
          collisions: [
            {
              secondTarget: {
                target: "рождения",
                animal: {
                  name: "Крыса",
                  element: {
                    name: "Вода Ян",
                  },
                  monthBounds: {
                    start: 341,
                    end: 5,
                  },
                },
                time: "Месяц",
              },
              shape: "Полукруг",
              color: "Красный",
              kind: "Столкновение",
              description:
                "Столкновение: Лошадь (День рождения) - Крыса (Месяц рождения)",
            },
          ],
          isGood: true,
          isBlack: false,
        },
        element: {
          name: "Металл Ян",
          isGood: false,
          isBlack: false,
        },
      },
      hour: {
        animal: {
          name: "Свинья",
          collisions: [
            {
              secondTarget: {
                target: "рождения",
                animal: {
                  name: "Свинья",
                  element: {
                    name: "Вода Инь",
                  },
                  monthBounds: {
                    start: 312,
                    end: 340,
                  },
                },
                time: "Год",
              },
              shape: "Квадрат",
              color: "Голубой",
              kind: "Самонаказание",
              description:
                "Самонаказание: Свинья (Час рождения) - Свинья (Год рождения)",
            },
          ],
          isGood: false,
          isBlack: false,
        },
        element: {
          name: "Огонь Инь",
          isGood: true,
          isBlack: false,
        },
      },
      currentPillar: {
        year: -1,
        month: -1,
        ageMonth: -1,
        ageYear: -1,
        animal: {
          name: "",
          isGood: true,
          isBlack: false,
        },
        element: {
          name: "",
          isGood: true,
          isBlack: false,
        },
      },
      pillars: [
        {
          year: 1983,
          month: 11,
          animal: {
            name: "Крыса",
            isGood: false,
            isBlack: false,
          },
          element: {
            name: "Дерево Ян",
            isGood: false,
            isBlack: false,
          },
          ageYear: 0,
          ageMonth: 0,
        },
        {
          year: 2095,
          month: 4,
          animal: {
            name: "Бык",
            isGood: false,
            isBlack: false,
          },
          element: {
            name: "Дерево Инь",
            isGood: false,
            isBlack: false,
          },
          ageYear: 111,
          ageMonth: 5,
        },
        {
          year: 2105,
          month: 4,
          animal: {
            name: "Тигр",
            isGood: false,
            isBlack: false,
          },
          element: {
            name: "Огонь Ян",
            isGood: false,
            isBlack: false,
          },
          ageYear: 121,
          ageMonth: 5,
        },
        {
          year: 2115,
          month: 4,
          animal: {
            name: "Кролик",
            isGood: false,
            isBlack: false,
          },
          element: {
            name: "Огонь Инь",
            isGood: false,
            isBlack: false,
          },
          ageYear: 131,
          ageMonth: 5,
        },
        {
          year: 2125,
          month: 4,
          animal: {
            name: "Дракон",
            isGood: false,
            isBlack: false,
          },
          element: {
            name: "Земля Ян",
            isGood: false,
            isBlack: false,
          },
          ageYear: 141,
          ageMonth: 5,
        },
        {
          year: 2135,
          month: 4,
          animal: {
            name: "Змея",
            isGood: false,
            isBlack: false,
          },
          element: {
            name: "Земля Инь",
            isGood: false,
            isBlack: false,
          },
          ageYear: 151,
          ageMonth: 5,
        },
        {
          year: 2145,
          month: 4,
          animal: {
            name: "Лошадь",
            isGood: false,
            isBlack: false,
          },
          element: {
            name: "Металл Ян",
            isGood: false,
            isBlack: false,
          },
          ageYear: 161,
          ageMonth: 5,
        },
        {
          year: 2155,
          month: 4,
          animal: {
            name: "Коза",
            isGood: false,
            isBlack: false,
          },
          element: {
            name: "Металл Инь",
            isGood: false,
            isBlack: false,
          },
          ageYear: 171,
          ageMonth: 5,
        },
        {
          year: 2165,
          month: 4,
          animal: {
            name: "Обезьяна",
            isGood: false,
            isBlack: false,
          },
          element: {
            name: "Вода Ян",
            isGood: false,
            isBlack: false,
          },
          ageYear: 181,
          ageMonth: 5,
        },
        {
          year: 2175,
          month: 4,
          animal: {
            name: "Петух",
            isGood: false,
            isBlack: false,
          },
          element: {
            name: "Вода Инь",
            isGood: false,
            isBlack: false,
          },
          ageYear: 191,
          ageMonth: 5,
        },
        {
          year: 2185,
          month: 4,
          animal: {
            name: "Собака",
            isGood: false,
            isBlack: false,
          },
          element: {
            name: "Дерево Ян",
            isGood: false,
            isBlack: false,
          },
          ageYear: 201,
          ageMonth: 5,
        },
      ],
      mainElement: {
        name: "Вода",
        animals: [
          {
            name: "Бык",
            isGood: false,
            isBlack: false,
          },
          {
            name: "Тигр",
            isGood: false,
            isBlack: false,
          },
          {
            name: "Свинья",
            isGood: false,
            isBlack: false,
          },
          {
            name: "Крыса",
            isGood: false,
            isBlack: false,
          },
        ],
        elements: [
          {
            name: "Вода Инь",
            isGood: false,
            isBlack: false,
          },
          {
            name: "Вода Ян",
            isGood: false,
            isBlack: false,
          },
        ],
      },
      cardStrength: {
        power: 4,
        powerDescription: "Сильная",
        powerfulElements: [
          {
            name: "Вода",
            animals: [
              {
                name: "Бык",
                isGood: false,
                isBlack: false,
              },
              {
                name: "Тигр",
                isGood: false,
                isBlack: false,
              },
              {
                name: "Свинья",
                isGood: false,
                isBlack: false,
              },
              {
                name: "Крыса",
                isGood: false,
                isBlack: false,
              },
            ],
            elements: [
              {
                name: "Вода Инь",
                isGood: false,
                isBlack: false,
              },
              {
                name: "Вода Ян",
                isGood: false,
                isBlack: false,
              },
            ],
          },
          {
            name: "Металл",
            animals: [
              {
                name: "Петух",
                isGood: false,
                isBlack: false,
              },
              {
                name: "Собака",
                isGood: false,
                isBlack: false,
              },
            ],
            elements: [
              {
                name: "Металл Инь",
                isGood: false,
                isBlack: false,
              },
              {
                name: "Металл Ян",
                isGood: false,
                isBlack: false,
              },
            ],
          },
        ],
        maxPower: 7,
        leader: {
          name: "Вода",
          animals: [
            {
              name: "Бык",
              isGood: false,
              isBlack: false,
            },
            {
              name: "Тигр",
              isGood: false,
              isBlack: false,
            },
            {
              name: "Свинья",
              isGood: false,
              isBlack: false,
            },
            {
              name: "Крыса",
              isGood: false,
              isBlack: false,
            },
          ],
          elements: [
            {
              name: "Вода Инь",
              isGood: false,
              isBlack: false,
            },
            {
              name: "Вода Ян",
              isGood: false,
              isBlack: false,
            },
          ],
        },
      },
      fallingStars: [
        {
          yearNumber: 7,
          monthNumber: 9,
          description: "",
          direction: "Запад",
        },
        {
          yearNumber: 3,
          monthNumber: 5,
          description: "",
          direction: "Юг",
        },
        {
          yearNumber: 5,
          monthNumber: 7,
          description: "",
          direction: "Восток",
        },
        {
          yearNumber: 6,
          monthNumber: 8,
          description: "",
          direction: "Север",
        },
        {
          yearNumber: 8,
          monthNumber: 1,
          description: "",
          direction: "Северо-Запад",
        },
        {
          yearNumber: 1,
          monthNumber: 3,
          description: "",
          direction: "Северо-Восток",
        },
        {
          yearNumber: 2,
          monthNumber: 4,
          description: "",
          direction: "Юго-Запад",
        },
        {
          yearNumber: 4,
          monthNumber: 6,
          description: "",
          direction: "Юго-Восток",
        },
        {
          yearNumber: 9,
          monthNumber: 2,
          description: "",
          direction: "Центр",
        },
      ],
    },
  });
  const [isOpenModal, setIsOpenModal]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const [modalContent, setModalContent]: [
    ReactJSXElement,
    Dispatch<SetStateAction<ReactJSXElement>>
  ] = useState(<p></p>);
  const openModal = (content: ReactJSXElement) => {
    setModalContent(content);
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  useEffect(() => {}, []);

  return (
    <>
      <ThemeProvider theme={modalTheme}>
        <Dialog fullWidth open={isOpenModal} onClose={closeModal}>
          {modalContent}
        </Dialog>
      </ThemeProvider>
      <div className={styles.nameContainer}>
        <h1 className={styles.name}>{cardInfo.name}</h1>
      </div>
      <IconedCardInfoList
        cardInfo={cardInfo}
        onClick={() => {
          openModal(<ModalIconedInfo cardInfo={cardInfo} />);
        }}
      />
      <div className={styles.cardHeadingContainer}>
        <h2 className={styles.cardHeading}>Карта</h2>
      </div>
      <div
        onClick={() => {
          openModal(<ModalCardInfo cardInfo={cardInfo} />);
        }}
      >
        <CardInfo cardInfo={cardInfo} />
      </div>
      <ul className={styles.otherInfoNamesList}>
        <h2 className={styles.otherInfoNamesItem}>Элементы</h2>
        <h2 className={styles.otherInfoNamesItem}>Летящие звезды</h2>
        <h2 className={styles.otherInfoNamesItem}>Животные</h2>
      </ul>

      <ul className={styles.otherInfoList}>
        <li
          className={styles.otherInfoListItem}
          onClick={() => {
            openModal(
              <ModalMainElementStar mainElement={cardInfo.mainElement} />
            );
          }}
        >
          <MainElementStar mainElement={cardInfo.mainElement} />
        </li>
        <li
          className={styles.otherInfoListItem}
          onClick={() => {
            openModal(
              <ModalFallingStars fallingStars={cardInfo.fallingStars} />
            );
          }}
        >
          <FallingStarsField stars={cardInfo.fallingStars} />
        </li>
        <li
          className={styles.otherInfoListItem}
          onClick={() => {
            openModal(<ModalAnimalChart />);
          }}
        >
          <AnimalChart />
        </li>
      </ul>
      <div>
        <div className={styles.chartTitleBox}>
          <span className={styles.chartTitle}>ГРАФИК</span>
          <CustomCheckBoxGroup
            checkboxesInfo={[
              { title: "Неделя", value: "Неделя" },
              { title: "Месяц", value: "Месяц" },
              { title: "Год", value: "Год" },
            ]}
            onChange={() => {}}
            className={styles.chartCheckboxes}
          />
        </div>
        <CardLineChart />
      </div>
      <div className={styles.cardHeadingContainer}>
        <h2 className={styles.cardHeading}>Такты</h2>
      </div>
      <div
        onClick={() => {
          openModal(
            <ModalPillars
              pillars={cardInfo.pillars}
              currentPillar={cardInfo.currentPillar}
            />
          );
        }}
      >
        <PillarsInfo
          pillars={cardInfo.pillars}
          currentPillar={cardInfo.currentPillar}
        />
      </div>

      <div className={styles.saveContainer}>
        <ThemeProvider theme={buttonTheme}>
          <Button>СОХРАНИТЬ</Button>
          <p className={styles.saveText}>
            Рассчитать совместимость с другой картой, генеалогическое древо
            можно построить, если зайти на полную версию сайта с компьютера.
          </p>
        </ThemeProvider>
      </div>
    </>
  );
}
