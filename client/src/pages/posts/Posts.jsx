import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "./../../context/Context";
import axios from "axios";
import Board from "../board/Board";
import Post from "../../components/post/Post";
import AddPost from "../../components/addPost/AddPost";
import "./posts.css";

function Posts() {
  const { pathname } = useLocation();
  const { token } = useContext(Context);
  const [name, setName] = useState("");
  const [posts, setPosts] = useState([]);

  // Get name of category
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
  }, [pathname, token.accessToken]);

  // Get all post of this category
  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get(`/posts/category${pathname}`, {
          headers: { authorization: `Bearer ${token.accessToken}` },
        });
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [pathname, token.accessToken]);

  return (
    <Board>
      <div className="posts">
        <div className="postsWrapper">
          <h1 className="postsTitle">{name}</h1>
          <div className="postsRender">
            {posts?.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
          <AddPost />
        </div>
      </div>
    </Board>
  );
}

export default Posts;
