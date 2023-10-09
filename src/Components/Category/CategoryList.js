import React, { useEffect, useState } from "react";
import axios from "axios";
import './CategoryList.css'; // Import your external CSS file

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/Categories/getAllCategories")
      .then((response) => {
        console.log("Received data from API:", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div>
      <h1>All Categories</h1>
      <div className="container">
        {categories.map((category) => (
          <div key={category.categoryId} className="avatar-container">
           
            <img
              src={`data:image/png;base64,${category.categoryImage}`}
              alt={`Image for ${category.categoryNames}`}
              className="avatar"
            />
             {category.categoryNames}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
