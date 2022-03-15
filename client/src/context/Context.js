import { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducer";
import axios from "axios";
import jwt_decode from "jwt-decode";

const INITIAL_STATES = {
  token: JSON.parse(localStorage.getItem("token")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATES);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATES);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(state.token));
  }, [state.token]);

  useEffect(() => {
    if (state.token) {
      const refreshToken = async () => {
        dispatch({ type: "LOGIN_START" });
        const { data } = await axios.post("/auth/refresh", {
          token: state.token?.refreshToken,
        });
        dispatch({ type: "REFRESH_TOKEN", payload: data });
        dispatch({ type: "END_LOAD" });
      };
      const { exp: expireToken } = jwt_decode(state.token?.accessToken);
      const currentTime = Math.round(new Date().getTime() / 1000);
      if (expireToken && currentTime >= expireToken) {
        refreshToken();
      } else {
        setTimeout(() => {
          dispatch({ type: "REFRESH_TOKEN", payload: state.token });
        }, (expireToken - currentTime) * 1000);
      }
    }
  }, [state.token]);

  return (
    <Context.Provider
      value={{
        token: state.token,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
