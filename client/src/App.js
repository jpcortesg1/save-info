import { useContext } from "react";
import { Context } from "./context/Context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Board from "./pages/board/Board";

function App() {
  const { token } = useContext(Context);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/board" /> : <Home />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/board" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/board" /> : <Register />}
          />

          <Route
            path="/board"
            element={token ? <Board /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
