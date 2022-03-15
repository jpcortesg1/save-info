import { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducer";
import axios from "axios";
import jwt_decode from "jwt-decode";

const axiosJWT = axios.create();

const INITIAL_STATES = {
  token: JSON.parse(localStorage.getItem("token")) || null,
  isFetching: false,
  error: false,
  axiosJWT,
};

export const Context = createContext(INITIAL_STATES);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATES);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(state.token));
  }, [state.token]);

  if (state.axiosJWT && state.token) {
    state.axiosJWT.interceptors.request.use(
      async (config) => {
        let currentData = new Date();
        const decodeToken = jwt_decode(state.token.accessToken);
        if (decodeToken.exp * 1000 < currentData.getTime()) {
          dispatch({ type: "REFRESH_TOKEN" });
          config.headers["authorization"] = "Bearer " + state.token.accessToken;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  return (
    <Context.Provider
      value={{
        token: state.token,
        isFetching: state.isFetching,
        error: state.error,
        axiosJWT: state.axiosJWT,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
