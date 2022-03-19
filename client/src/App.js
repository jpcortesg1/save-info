import { useContext } from "react";
import { Context } from "./context/Context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Posts from "./pages/posts/Posts";

function App() {
  const { token } = useContext(Context);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/:postId"
            element={token ? <Posts /> : <Navigate to="/register" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
