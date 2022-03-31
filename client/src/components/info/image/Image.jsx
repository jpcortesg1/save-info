import "./image.css";
import { useState, useEffect } from "react";

const Image = ({ info, id, deleteInfo }) => {
  const [image, setImage] = useState(info.image);

  useEffect(() => {
    info.image = image;
  }, [image, info]);

  const handleDelete = () => {
    deleteInfo(id);
  };

  return (
    <div className="infoImage">
      <div className="infoImageWrapper">
        {image ? (
          <div className="infoImageContent">
            <img src={URL.createObjectURL(image)} alt="" />
            <label
              htmlFor={`infoImageInput${id}`}
              className="infoImageLabel infoImageLabelAbsolute"
            >
              <i className="fa-solid fa-pencil"></i>
            </label>
            <i
              className="fa-solid fa-trash infoImageLabel infoImageLabelAbsolute infoImageLabelAbsoluteTrash"
              onClick={handleDelete}
            ></i>
          </div>
        ) : (
          <div className="infoImageNoImage">
            <label htmlFor={`infoImageInput${id}`} className="infoImageLabel">
              Add Image <i className="fa-solid fa-plus"></i>
            </label>
            <i
              className="fa-solid fa-trash infoImageLabel infoImageLabelTrash"
              onClick={handleDelete}
            ></i>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="infoImageInput"
          id={`infoImageInput${id}`}
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
    </div>
  );
};

export default Image;
