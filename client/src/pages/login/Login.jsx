import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Icon from "./../../components/icon/Icon";
import axios from "axios";
import { Context } from "./../../context/Context";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    const params = {
      username,
      password,
    };
    try {
      const { data } = await axios.post("/auth/login", params);
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginRight">
          <div className="loginIcon">
            <Icon />
          </div>
        </div>

        <div className="loginLeft">
          <h2 className="loginTitle">Login</h2>
          <form action="" className="loginForm" onSubmit={handleSubmit}>
            <input
              className="loginInpunt"
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="loginInpunt"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginButton" disabled={isFetching}>
              Login
            </button>
          </form>
          <button className="loginButton loginButtonRegister">
            <Link className="link" to="/register" disabled={isFetching}>
              Register
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
