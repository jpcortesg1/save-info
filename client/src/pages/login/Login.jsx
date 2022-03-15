import { Link } from "react-router-dom";
import Icon from "./../../components/icon/Icon";
import "./login.css";

function Login() {
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
          <form action="" className="loginForm">
            <input className="loginInpunt" type="text" placeholder="username" />
            <input
              className="loginInpunt"
              type="password"
              placeholder="password"
            />
            <button className="loginButton">Login</button>
          </form>
          <button className="loginButton loginButtonRegister">
            <Link className="link" to="/register">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
