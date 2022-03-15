import { Link } from "react-router-dom";
import Icon from "../../components/icon/Icon";
import "./home.css";

function home() {
  return (
    <div className="home">
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

export default home;
