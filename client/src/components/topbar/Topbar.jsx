import { useEffect, useContext, useState } from "react";
import { Context } from "./../../context/Context";
import { Link } from "react-router-dom";
import axios from "axios";
import Icon from "./../icon/Icon";
import "./topbar.css";

function Topbar() {
  const PF = process.env.REACT_APP_PF;
  const [photo, setPhoto] = useState("");
  const { token, dispatch } = useContext(Context);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("/users/", {
          headers: {
            authorization: "Bearer " + token.accessToken,
          },
        });
        setPhoto(data.photo);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [token.accessToken]);

  const handleLogout = async (e) => {
    try {
      await axios.post(
        "/auth/logout",
        { token: token.refreshToken },
        {
          headers: {
            authorization: "Bearer " + token.accessToken,
          },
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: null });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="topbar">
      <div className="topbarLeft">
        <Link className="link" to="/">
          <Icon />
        </Link>
      </div>
      <div className="topbarRight">
        <div className="topbarProfile">
          <Link className="link" to="/profile">
            <img src={photo ? PF + photo : ""} alt="" className="topbarImg" />
          </Link>
        </div>
        <button className="topbarLogout" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Topbar;
