import React from "react";
import css from "./index.module.css";

const Category = () => {
  const obj = {
    2: "category",
    1: "category",
  };
  console.log(`obj`, obj);
  return (
    <div
      className={css.parent}
      onMouseEnter={() => console.log(`1111111`)}
      onMouseOver={() => console.log(`parent-onmouseover`)}
    >
      <div
        className={css.child1}
        onMouseEnter={() => console.log(`cccc`)}
        onMouseOver={() => console.log(`child1-onmouseover`)}
      >
        Category
      </div>
      <div className={css.child2}>aaaa</div>
    </div>
  );
};

export default Category;
