import {
  PayloadAction,
  configureStore,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { cardInfoType, stateType, userType } from "./types";

const token = localStorage.getItem("token");

const initialState: stateType = {
  user: null,
  token,
  isLoading: true,
  loadingImages: [],
};

type setLoadingPayloadType = {
  value: boolean;
  from: string;
};

var usedImages: string[] = [];

export const setUserAction = createAction<userType, "SET_USER">("SET_USER");
export const addCardAction = createAction<cardInfoType, "ADD_CARD">("ADD_CARD");
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

export const store = configureStore({
  reducer: createReducer(initialState, (builder) => {
    builder
      .addCase(setUserAction, (state, action: PayloadAction<userType>) => {
        return {
          ...state,
          user: action.payload,
        };
      })
      .addCase(addCardAction, (state, action: PayloadAction<cardInfoType>) => {
        state.user.cards.push(action.payload);
      })
      .addCase(
        setLoadingAction,
        (state, action: PayloadAction<setLoadingPayloadType>) => {
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
        // console.log("usedImages", usedImages);

        if (
          !state.loadingImages.includes(action.payload) &&
          !usedImages.includes(action.payload)
        ) {
          state.loadingImages.push(action.payload);
          usedImages.push(action.payload);

          state.isLoading = true;
        }
      })
      .addCase(removeLoadingImage, (state, action) => {
        state.loadingImages = state.loadingImages.filter(
          (image) => image !== action.payload
        );

        if (state.loadingImages.length === 0) {
          state.isLoading = false;
        }
      })
      .addCase(clearLoadingImages, (state, action) => {
        usedImages = [];
        // console.log("cleared cash");
      });
  }),
});
