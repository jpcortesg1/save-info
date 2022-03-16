const Reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_TOKEN":
      return {
        ...state,
        token: {
          ...state.token,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
      };

    case "LOGIN_START":
      return {
        ...state,
        isFetching: true,
      };

    case "END_LOAD":
      return {
        ...state,
        isFetching: false,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isFetching: false,
        token: action.payload,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default Reducer;
