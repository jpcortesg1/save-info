import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import "./sidebar.css";
import Category from "../category/Category";
import AddCategory from "../addCategory/AddCategory";

function Sidebar() {
  const { token } = useContext(Context);
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="sidebar">
      <h3 className="sidebarTitle">Categories</h3>
      <div className="sidebarList">
        {categories.map((category) => (
          <Category key={category._id} category={category} />
        ))}
      </div>
      <AddCategory />
    </div>
  );
}

export default Sidebar;
