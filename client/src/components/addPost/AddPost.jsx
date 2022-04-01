import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import Description from "../info/description/Description";
import Image from "../info/image/Image";
import SubTitle from "../info/subTitle/SubTitle";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./addPost.css";

const AddPost = ({ setPosts, posts}) => {
  const { token } = useContext(Context);
  const [modal, setModal] = useState(false);
  const [optionsInfo, setOptionInfo] = useState(false);
  const [banner, setBanner] = useState("");
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState([]);
  const location = useLocation();

  const deleteInfo = (id) => {
    setInfo([...info.slice(0, id), {}, ...info.slice(id + 1)]);
  };

  const savePhoto = async (file) => {
    // Create format to save photo
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("name", filename);
    data.append("file", file);

    try {
      await axios.post("/upload", data);
      return filename;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get all data to save new post
    const camps = {
      title,
      banner,
      idCategory: location.pathname.slice(1),
      info: info.filter((camp) => {
        return (
          Object.keys(camp).length !== 0 &&
          Object.values(camp)[0].toString() !== ""
        );
      }),
    };

    // Save all photos
    camps.banner = await savePhoto(camps.banner);
    camps.info.map(async (camp) => {
      if (Object.keys(camp)[0].toString() === "image") {
        const filename = await savePhoto(camp.image);
        camp.image = filename;
      }
    });

    try {
      const { data } = await axios.post(
        "/posts",
        { camps },
        { headers: { authorization: "Bearer " + token.accessToken } }
      );
      setPosts([...posts, data]);
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="addPost" onClick={() => setModal(true)}>
        Create
        <i className="fa-solid fa-circle-plus addPostIcon"></i>
      </div>

      {modal && (
        <div className="addPostModal">
          <div className="addPostWrapper">
            <form action="" className="addPostForm" onSubmit={handleSubmit}>
              <div className="addPostImage">
                {banner ? (
                  <img
                    className="addPostFile"
                    src={URL.createObjectURL(banner)}
                    alt=""
                  />
                ) : (
                  <div className="noPostImage">
                    <label htmlFor="addImage" className="addPostImageLabel">
                      Add Image
                      <i className="fa-solid fa-plus addPostImageLabelIcon"></i>
                    </label>
                  </div>
                )}
                <label
                  htmlFor="addImage"
                  className="addPostImageLabel addPostImageLabelAbsolute"
                >
                  <i className="fa-solid fa-pen"></i>
                </label>
                <input
                  type="file"
                  id="addImage"
                  className="addImage"
                  accept="image/*"
                  onChange={(e) => setBanner(e.target.files[0])}
                />
              </div>
              <input
                type="text"
                className="addPostInputTitle"
                placeholder="Write your title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="addPostInformation">
                {info.map((i, n) => {
                  return (
                    <div className="info" key={n}>
                      {Object.keys(i).toString() === "image" && (
                        <Image
                          info={i}
                          id={n}
                          deleteInfo={(num) => deleteInfo(num)}
                        />
                      )}
                      {Object.keys(i).toString() === "description" && (
                        <Description
                          info={i}
                          id={n}
                          deleteInfo={(num) => deleteInfo(num)}
                        />
                      )}
                      {Object.keys(i).toString() === "subTitle" && (
                        <SubTitle
                          info={i}
                          id={n}
                          deleteInfo={(num) => deleteInfo(num)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <button className="addPostInput addPostInputButton" type="submit">
                Create
              </button>
            </form>

            <div className="addInfo">
              <span
                className="addInfoShow"
                onClick={() => setOptionInfo(!optionsInfo)}
              >
                <i className="fa-solid fa-plus"></i>
              </span>
              {optionsInfo && (
                <ul className="addInfoOptions">
                  <li
                    className="addInfoOptionsOption"
                    onClick={() => setInfo([...info, { subTitle: "" }])}
                  >
                    Sub Title
                  </li>
                  <li
                    className="addInfoOptionsOption"
                    onClick={() => setInfo([...info, { description: "" }])}
                  >
                    Description
                  </li>
                  <li
                    className="addInfoOptionsOption"
                    onClick={() => setInfo([...info, { image: "" }])}
                  >
                    Image
                  </li>
                </ul>
              )}
            </div>

            <button
              className="addPostButton addPostButtonClose"
              onClick={() => setModal(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPost;
