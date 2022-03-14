import "./home.css";

function home() {
  const PF = process.env.REACT_APP_PF;
  return (
    <div className="home">
      <div className="homeWrapper">
        <div className="homeTop">
          <div className="homeLogo">
            <img src={`${PF}/logo1.png`} className="homeLogoImg" />
          </div>
          <h1 className="homeTitle">Save Info</h1>
        </div>
        <div className="homeBottom">
          <p className="homeDescription">
            Save Info is an application where you can store personal information
            organized into different categories.
          </p>
          <button className="homeButton">Get Start</button>
        </div>
        <button className="homeButton homeButtonLogin">Login</button>
        <div className="homeFigure"></div>
      </div>
    </div>
  );
}

export default home;
