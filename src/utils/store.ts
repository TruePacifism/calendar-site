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
};
export const setUserAction = createAction<userType, "SET_USER">("SET_USER");
export const addCardAction = createAction<cardInfoType, "ADD_CARD">("ADD_CARD");
export const setLoadingAction = createAction<boolean, "SET_LOADING">(
  "SET_LOADING"
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
      .addCase(setLoadingAction, (state, action: PayloadAction<boolean>) => {
        return {
          ...state,
          isLoading: action.payload,
        };
      });
  }),
});
