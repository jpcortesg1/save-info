import React, { useEffect, useState } from "react";
import "./subTitle.css"

const SubTitle = ({ info, id, deleteInfo }) => {
  const [subTitle, setSubTitle] = useState(info.subTitle);

  useEffect(() => {
    info.subTitle = subTitle;
  }, [info, subTitle]);

  const handleDelete = () => {
    deleteInfo(id);
  };

  return (
    <div className="infoSubTitle">
      <div className="infoSubTitleWrapper">
        <input
          className="infoSubTitleWrapperContent"
          placeholder="Writte your sub title"
          onChange={(e) => setSubTitle(e.target.value)}
        ></input>
        <div className="infoSubTitlenActions">
          <i
            className="fa-solid fa-trash infoSubTitlenAction"
            onClick={handleDelete}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default SubTitle;
