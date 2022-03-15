import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Icon from "./../../components/icon/Icon";
import "./register.css";

function Register() {
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PF;

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parameters = {
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;

      data.append("name", filename);
      data.append("file", file);
      parameters.photo = filename;

      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    } else {
      parameters.photo = "no-avatar.jpeg";
    }

    try {
      const { data } = await axios.post("/auth/register", parameters);
      data && navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerRight">
          <div className="registerIcon">
            <Icon />
          </div>
          <div className="registerProfile">
            {!file ? (
              <img
                src={`${PF}no-avatar.jpeg`}
                alt=""
                className="registerProfileImg"
              />
            ) : (
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="registerProfileImg"
              />
            )}
          </div>
        </div>

        <div className="registerLeft">
          <h2 className="registerTitle">Register</h2>
          <form action="" className="registerForm" onSubmit={handleSubmit}>
            <label className="registerLabel" htmlFor="file">
              <i className="fa-solid fa-image registerFormIcon"></i>
              Add Profile picture
            </label>
            <input
              className="registerInpunt registerInputFile"
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              className="registerInpunt"
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="registerInpunt"
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="registerInpunt"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="registerButton">Register</button>
          </form>
          <button className="registerButton registerButtonRegister">
            <Link className="link" to="/login">
              Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
