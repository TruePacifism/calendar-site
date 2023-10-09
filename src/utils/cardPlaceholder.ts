import { cardInfoType } from "./types";

const cardInfoPlaceholder: cardInfoType = {
  id: "1c2b973d-b86f-4096-934b-0b1094d33dd5",
  name: "Евгений Егоров",
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
};

export default cardInfoPlaceholder;
