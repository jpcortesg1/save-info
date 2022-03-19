import { useContext } from "react";
import { Context } from "./../../context/Context";
import { Link } from "react-router-dom";
import Icon from "../../components/icon/Icon";
import "./home.css";
import Board from "../board/Board";

function Home() {
  const { token } = useContext(Context);

  return token ? (
    <Board>
      <div className="home">
        <h1 className="homeTitle">Save Data</h1>  
        <div className="homeIcon">
          <Icon />
        </div>
        <p className="homeYouCan">You can:</p>
        <div className="">
          <div className="homeCan">
            <i className="fa-solid fa-plus icon"></i>
            <i className="fa-solid fa-pen icon"></i>
            <i className="fa-solid fa-eraser icon"></i>
          </div>
          <div className="home">
            <p className="homeCanActions">Account</p>
            <p className="homeCanActions">Categories</p>
            <p className="homeCanActions">Information</p>
          </div>
        </div>
      </div>
    </Board>
  ) : (
    <div className="Home">
      <div className="homeWrapper">
        <div className="homeTop">
          <div className="homeIcon">
            <Icon />
          </div>
          <h1 className="homeTitle">Save Info</h1>
        </div>
        <div className="homeBottom">
          <p className="homeDescription">
            Save Info is an application where you can store personal information
            organized into different categories.
          </p>
          <button className="homeButton">
            <Link to="/register" className="link">
              Get Start
            </Link>
          </button>
        </div>
        <button className="homeButton homeButtonLogin">
          <Link className="link" to="/login">
            Login
          </Link>
        </button>
        <div className="homeFigure"></div>
      </div>
    </div>
  );
}

export default Home;
