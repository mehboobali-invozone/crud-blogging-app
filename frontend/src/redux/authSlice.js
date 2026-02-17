import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";

const token = cookie.get("access_token");
const user = cookie.get("user");

const initialState = {
  token: token || null,
  details: user ? JSON.parse(user) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.details = action.payload.details;

      cookie.set("access_token", action.payload.token);
      cookie.set("user", JSON.stringify(action.payload.details));
    },

    logout: (state) => {
      state.token = null;
      state.details = null;

      cookie.remove("access_token");
      cookie.remove("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
