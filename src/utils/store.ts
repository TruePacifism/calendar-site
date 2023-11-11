import { configureStore } from "@reduxjs/toolkit";
import getUserInfo from "../api/getUserInfo";
// ...

type stateType = {
  user: {
    name: string;
    mail: string;
    livingcity: string;
    birthcity: string;
  };
};

const initialState: stateType = {
  user: null,
};

export const store = configureStore({
  reducer: {
    user: async (state) => {
      const token = localStorage.getItem("token");
      const user = getUserInfo({ token });
      return { ...state, user };
    },
  },
});
