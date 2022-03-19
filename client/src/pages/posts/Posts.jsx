import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "./../../context/Context";
import axios from "axios";
import Board from "../board/Board";
import "./posts.css";

function Posts() {
  const { pathname } = useLocation();
  const { token } = useContext(Context);
  const [name, setName] = useState("");

  useEffect(() => {
    const getName = async () => {
      try {
        const { data } = await axios.get(`categories${pathname}`, {
          headers: { authorization: `Bearer ${token.accessToken}` },
        });
        setName(data.name);
      } catch (error) {
        console.log(error);
      }
    };
    getName();
  });

  return (<Board>{name}</Board>);
}

export default Posts;
