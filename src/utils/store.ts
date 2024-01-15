import {
  PayloadAction,
  configureStore,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import {
  cardInfoType,
  dateType,
  sortingType,
  stateType,
  userType,
} from "./types";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { dateToDateType, dateTypeToDate } from "./dateToDateType";
import date from "date-and-time";

const token = localStorage.getItem("token");

const initialState: stateType = {
  user: null,
  token,
  modalContent: null,
  isLoading: true,
  loadingImages: [],
  isErrorPage: false,
  mainPageInfo: null,
};

type setLoadingPayloadType = {
  value: boolean;
  from: string;
};

export let usedImages: string[] = [];

export const setUserAction = createAction<userType, "SET_USER">("SET_USER");
export const addCardAction = createAction<cardInfoType, "ADD_CARD">("ADD_CARD");
export const deleteCardAction = createAction<string, "DELETE_CARD">(
  "DELETE_CARD"
);
export const setLoadingAction = createAction<
  setLoadingPayloadType,
  "SET_LOADING"
>("SET_LOADING");
export const addLoadingImage = createAction<string, "ADD_LOADING_IMAGE">(
  "ADD_LOADING_IMAGE"
);
export const removeLoadingImage = createAction<string, "REMOVE_LOADING_IMAGE">(
  "REMOVE_LOADING_IMAGE"
);
export const clearLoadingImages = createAction<null, "CLEAR_LOADING_IMAGE">(
  "CLEAR_LOADING_IMAGE"
);
export const setIsErrorPageAction = createAction<boolean, "SET_IS_ERROR_PAGE">(
  "SET_IS_ERROR_PAGE"
);
export const openModalAction = createAction<ReactJSXElement, "OPEN_MODAL">(
  "OPEN_MODAL"
);
export const closeModalAction = createAction<null, "CLOSE_MODAL">(
  "CLOSE_MODAL"
);
export const sortCardsAction = createAction<sortingType, "SORT_CARDS">(
  "SORT_CARDS"
);
export const setMainPageDateAction = createAction<
  dateType,
  "SET_MAIN_PAGE_DATE"
>("SET_MAIN_PAGE_DATE");
export const incrementMainPageDateAction = createAction<
  null,
  "INCREMENT_MAIN_PAGE_ACTION"
>("INCREMENT_MAIN_PAGE_ACTION");
export const decrementMainPageDateAction = createAction<
  null,
  "DECREMENT_MAIN_PAGE_ACTION"
>("DECREMENT_MAIN_PAGE_ACTION");

export const store = configureStore({
  reducer: createReducer(initialState, (builder) => {
    builder
      .addCase(setUserAction, (state, action: PayloadAction<userType>) => {
        const user = action.payload;
        state.user = user;
        state.mainPageInfo = {
          name: "today",
          livingcity: user.livingcity,
          birthcity: user.birthcity,
          birthdate: dateToDateType(new Date()),
          gender: "female",
        };
      })
      .addCase(addCardAction, (state, action: PayloadAction<cardInfoType>) => {
        state.user.cards.push(action.payload);
      })
      .addCase(deleteCardAction, (state, action: PayloadAction<string>) => {
        state.user.cards = state.user.cards.filter(
          (card) => card.id !== action.payload
        );
      })
      .addCase(
        setLoadingAction,
        (state, action: PayloadAction<setLoadingPayloadType>) => {
          // console.log(action.payload);

          // if (action.payload.value) {
          //   document.body.classList.add("no-scroll");
          // } else {
          //   document.body.classList.remove("no-scroll");
          // }
          return {
            ...state,
            isLoading: action.payload.value,
          };
        }
      )
      .addCase(addLoadingImage, (state, action) => {
        // console.log("usedImages", usedImages.length);
        // console.log("loadingImages", state.loadingImages.length);
        // console.log(usedImages);

        if (
          !state.loadingImages.includes(action.payload) &&
          !usedImages.includes(action.payload)
        ) {
          // console.log("start loading images: ", action.payload);
          state.loadingImages.push(action.payload);
          usedImages.push(action.payload);
        }
      })
      .addCase(removeLoadingImage, (state, action) => {
        // console.log("usedImages", usedImages.length);
        // console.log("loadingImages", state.loadingImages.length);
        state.loadingImages = state.loadingImages.filter(
          (image) => image !== action.payload
        );

        if (state.loadingImages.length === 0) {
          state.isLoading = false;
          // console.log("loaded all images");
        }
      })
      .addCase(clearLoadingImages, (state, action) => {
        usedImages = [];
        // console.log("usedImages", usedImages.length);
        // console.log("loadingImages", state.loadingImages.length);
        // console.log("cleared cash");
      })
      .addCase(setIsErrorPageAction, (state, action) => {
        state.isErrorPage = action.payload;
      })
      .addCase(
        openModalAction,
        (state, action: PayloadAction<ReactJSXElement>) => {
          return {
            ...state,
            modalContent: action.payload,
          };
        }
      )
      .addCase(closeModalAction, (state, action: PayloadAction<null>) => {
        return {
          ...state,
          modalContent: null,
        };
      })
      .addCase(sortCardsAction, (state, action: PayloadAction<sortingType>) => {
        if (!state.user) {
          return;
        }
        const { cards } = state.user;
        if (!cards || cards.length < 2) {
          return;
        }
        if (action.payload === "oldFirst") {
          cards.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        } else {
          cards.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        }
        state.isLoading = false;
      })
      .addCase(
        setMainPageDateAction,
        (state, action: PayloadAction<dateType>) => {
          state.mainPageInfo.birthdate = action.payload;
        }
      )
      .addCase(
        incrementMainPageDateAction,
        (state, action: PayloadAction<null>) => {
          const newDate: Date = dateTypeToDate(state.mainPageInfo.birthdate);

          state.mainPageInfo.birthdate = dateToDateType(
            date.addDays(newDate, 1)
          );
        }
      )
      .addCase(
        decrementMainPageDateAction,
        (state, action: PayloadAction<null>) => {
          const newDate: Date = dateTypeToDate(state.mainPageInfo.birthdate);

          state.mainPageInfo.birthdate = dateToDateType(
            date.addDays(newDate, -1)
          );
        }
      );
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["OPEN_MODAL"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});
