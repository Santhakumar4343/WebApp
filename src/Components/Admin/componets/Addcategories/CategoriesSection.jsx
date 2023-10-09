import React, { useEffect, useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import AddSubcategoryForm from "./AddSubcategoryForm"; // Import the AddSubcategoryForm component
import "./AddCategoryModal.css";



const Subcategory = ({ subcategory }) => (
  <div>
    {subcategory.subCategoryNames}
  </div>
);

const SubcategoriesList = ({ categoryId }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/subcategroy/getByCategory/${categoryId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          setSubcategories(data);
        } else {
          setError(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
        setError(error);
      });
  }, [categoryId]);

  return (
    <div>
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        Array.isArray(subcategories) &&
        subcategories.map((subcategory) => (
          <Subcategory
            key={subcategory.subId}
            subcategory={subcategory}
          />
        ))
      )}
    </div>
  );
};

const Category = ({ categoryId, categoryNames, categoryImage }) => {
  const [isAddSubcategoryFormOpen, setAddSubcategoryFormOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleOpenAddSubcategoryForm = () => {
    setAddSubcategoryFormOpen(true);
  };

  const handleCloseAddSubcategoryForm = () => {
    setAddSubcategoryFormOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "300px",
            margin: "10px",
          }}
        >
          <img
            src={`data:image/jpeg;base64,${categoryImage}`}
            alt={categoryNames}
            style={{
              width: "100%",
              height: "200px",
              maxWidth: "100%",
            }}
          />
          <p>{categoryNames}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            margin: "10px",
          }}
        >
          <button onClick={handleOpenAddSubcategoryForm}>
            Add Subcategory
          </button>
          <SubcategoriesList categoryId={categoryId} />
        </div>
      </div>
      {isAddSubcategoryFormOpen && (
        <div className="modal-overlay">
          <AddSubcategoryForm
            categoryId={categoryId}
            onClose={handleCloseAddSubcategoryForm}
          />
        </div>
      )}
    </>
  );
};

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);

  const handleOpenAddCategoryModal = () => {
    setAddCategoryModalOpen(true);
  };
  const handleCloseAddCategoryModal = () => {
    setAddCategoryModalOpen(false);
  };
  useEffect(() => {
    fetch("http://localhost:8080/api/Categories/getAllCategories")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const chunkedCategories = [];
  for (let i = 0; i < categories.length; i += 3) {
    chunkedCategories.push(categories.slice(i, i + 3));
  }
  return (
    <div>
      <button onClick={handleOpenAddCategoryModal}>Add Category</button>
      {chunkedCategories.map((row, rowIndex) => (
        <div key={rowIndex} className="category-row">
          {row.map((category) => (
            <Category
              key={category.categoryId}
              categoryId={category.categoryId}
              categoryNames={category.categoryNames}
              categoryImage={category.categoryImage}
            />
          ))}
        </div>
      ))}
      {isAddCategoryModalOpen && (
        <div className="modal-overlay">
          <AddCategoryModal onClose={handleCloseAddCategoryModal} />
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
