import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import "./sidebar.css";
import Category from "../category/Category";
import AddCategory from "../addCategory/AddCategory";

function Sidebar() {
  const { token } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    const getCategoires = async () => {
      const { data } = await axios.get("/categories/user", {
        headers: {
          authorization: "Bearer " + token.accessToken,
        },
      });
      setCategories(data);
    };
    getCategoires();
  }, [token.accessToken]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [categories]);

  return (
    <div className="sidebar">
      <h3 className="sidebarTitle">Categories</h3>
      <div className="sidebarList">
        {categories.map((category) => (
          <div className="sidebarCategory" ref={scrollRef} key={category._id}>
            <Category
              category={category}
              categories={categories}
              setCategories={setCategories}
            />
          </div>
        ))}
      </div>
      <AddCategory categories={categories} setCategories={setCategories} />
    </div>
  );
}

export default Sidebar;
