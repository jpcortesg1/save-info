const Reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_TOKEN":
      state.axiosJWT
        .post("/auth/refres", { token: state.token.refreshToken })
        .then(({ data }) => {
          return {
            ...state,
            token: {
              ...state.token,
              refreshToken: data.refreshToken,
              accessToken: data.accessToken,
            },
          };
        });
      return state;

    case "LOGIN_START":
      return {
        ...state,
        isFetching: true,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
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
