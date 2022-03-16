import "./category.css";

function Category({ category }) {
  return (
    <div className="category">
      <p className="categoryName">{category.name}</p>
      <div className="categoryActions">
        <button className="categoryAction">
          <i className="fa-solid fa-trash"></i>
        </button>
        <button className="categoryAction categoryActionEdit">
          <i className="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>
  );
}

export default Category;
