import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./board.css";

function Board() {
  return (
    <div className="board">
      <Topbar />
      <div className="boardMain">
        <Sidebar />
        <div className="boardContainter">
          Hola
        </div>
      </div>
    </div>
  );
}

export default Board;
