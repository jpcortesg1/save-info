import { useContext } from "react";
import { Context } from "./../../context/Context";
import axios from "axios";
import "./board.css";

function Board() {
  const { token, isFetching } = useContext(Context);
  const handleClick = async (e) => {
    e.preventDefault();
    if (!isFetching) {
      const { data } = await axios.post("/users/verify", null, {
        headers: {
          authorization: `Bearer ${token.accessToken}`,
        },
      });
      console.log(data);
    }
  };

  return (
    <div>
      Form Board
      <form action="" className="form" onSubmit={handleClick}>
        <button>Send</button>
      </form>
    </div>
  );
}

export default Board;
