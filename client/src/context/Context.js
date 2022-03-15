import { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATES = {
  token: null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATES);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATES);

  return (
    <Context.Provider
      values={{
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
