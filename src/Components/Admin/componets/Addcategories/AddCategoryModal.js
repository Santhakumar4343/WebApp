import React, { useState } from "react";
import "./AddCategoryModal.css";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategoryModal = ({ onClose }) => {
  const [categoryNames, setCategoryNames] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append("categoryNames", categoryNames);
    formData.append("categoryImage", categoryImage);

    try {
      // Send the form data to your API endpoint for adding categories
      const response = await fetch(
        "http://localhost:8080/api/Categories/save",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Category Added successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        onClose(); // Close the modal after successfully adding a category
      } else {
        console.error("Failed to add category");
        toast.error("Failed to save category", {
          position: toast.POSITION.TOP_RIGHT,
        });
        
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save category", {
        position: toast.POSITION.TOP_RIGHT,
      });
    
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // Prevent the modal from closing when clicking inside it
  };
  const isTextValid = (text) => {
    // Regular expression to allow only alphabets and spaces
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(text);
  };

  const handleCategoryNamesChange = (e) => {
    const value = e.target.value;

    // Check if the entered text is valid
    if (isTextValid(value) || value === "") {
      setCategoryNames(value);
    }
  };
  return (
    <div className="modal-container">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" onClick={handleModalClick}>
          <h2 className="text-center" style={{ color: "black" }}>
            Add Category
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row align-items-center">
              <div className="col">
                <div className="form-group">
                  <TextField
                    type="text"
                    id="categoryNames"
                    value={categoryNames}
                    onChange={handleCategoryNamesChange}

                    fullWidth
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    InputProps={{
                      style: { color: "black" },
                    }}
                    label="CategoryName"
                  />
                </div>
              </div>
              <div className="col">
                <div
                  className={`form-group ${categoryImage ? "has-file" : ""}`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCategoryImage(e.target.files[0])}
                    required
                    name="file"
                    id="file"
                  />
                  {categoryImage && (
                    <div className="selected-file">
                      Selected File: {categoryImage.name}
                    </div>
                  )}
                </div>
              </div>
              <div className="col text-start ">
                <button type="submit" className="btn btn-primary">
                  Add Category
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;