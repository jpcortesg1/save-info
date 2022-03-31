import { useState, useEffect } from "react";
import "./description.css";

const Description = ({ info, id, deleteInfo }) => {
  const [description, setDescription] = useState(info.description);

  useEffect(() => {
    info.description = description;
  }, [description, info]);

  const handleDelete = () => {
    deleteInfo(id);
  };

  return (
    <div className="infoDescription">
      <div className="infoDescriptionWrapper">
        <textarea
          className="infoDescriptionWrapperContent"
          placeholder="Writte your description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="infoDescriptionActions">
          <i
            className="fa-solid fa-trash infoDescriptionAction"
            onClick={handleDelete}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Description;
