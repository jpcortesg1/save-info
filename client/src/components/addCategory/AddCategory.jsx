import { useContext, useState } from "react";
import { Context } from "./../../context/Context";
import axios from "axios";
import "./addCategory.css";

function AddCategory({ categories, setCategories }) {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const { token } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/categories",
        { name },
        { headers: { authorization: "Bearer " + token.accessToken } }
      );
      setCategories([...categories, data]);
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button className="addCategoryButton" onClick={() => setModal(true)}>
        <i className="fa-solid fa-plus"></i>
      </button>

      {modal && (
        <div className="addCategoryModal">
          <div className="addCategory">
            <h2 className="addCategoryTitle">Create New Category</h2>
            <form action="" className="addCategoryForm" onSubmit={handleSubmit}>
              <input
                type="text"
                className="addCategoryInput"
                placeholder="Write your category"
                onChange={(e) => setName(e.target.value)}
              />
              <button className="addCategoryInput addCategoryInputButton">
                Create
              </button>
            </form>
            <button
              className="addCategoryButton addCategoryButtonClose"
              onClick={() => setModal(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddCategory;
