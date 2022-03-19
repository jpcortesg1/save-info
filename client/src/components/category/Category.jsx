import { useContext, useState } from "react";
import { Context } from "./../../context/Context";
import { Link } from "react-router-dom";
import axios from "axios";
import "./category.css";

function Category({ category, setCategories, categories }) {
  const [name, setName] = useState(category.name);
  const [modal, setModal] = useState(false);
  const { token } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      "/categories",
      { id: category._id, name },
      { headers: { authorization: "Bearer " + token.accessToken } }
    );
    setCategories([...categories.filter((c) => c._id !== category._id), data]);
    setModal(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/categories", {
        headers: { authorization: "Bearer " + token.accessToken },
        data: { id: category._id },
      });
      setCategories([...categories.filter((c) => c._id !== category._id)]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link
        className="link"
        to={`/${category._id}`}
        style={{
          flex: 8,
          overflowX: "hidden",
        }}
      >
        <p className="categoryName">{name}</p>
      </Link>
      <div className="categoryActions">
        <button className="categoryAction" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i>
        </button>
        <button
          className="categoryAction categoryActionEdit"
          onClick={() => setModal(true)}
        >
          <i className="fa-solid fa-pencil"></i>
        </button>
      </div>

      {modal && (
        <div className="categoryModal">
          <div className="category">
            <h2 className="categoryTitle">Update Category</h2>
            <form action="" className="categoryForm" onSubmit={handleSubmit}>
              <input
                type="text"
                className="categoryInput"
                placeholder="Write your new name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <button className="categoryInput categoryInputButton">
                Update
              </button>
            </form>
            <button
              className="categoryButton categoryButtonClose"
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

export default Category;
