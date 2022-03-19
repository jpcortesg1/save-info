import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./board.css";

function Board({ children }) {
  return (
    <div className="board">
      <Topbar />
      <div className="boardMain">
        <Sidebar />
        <div className="boardContainter">{children}</div>
      </div>
    </div>
  );
}

export default Board;
