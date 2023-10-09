import React, { useState } from "react";
import "./AddCategoryModal.css"; // Import the same CSS file
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid"; // Import Grid from Material-UI
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSubcategoryForm = ({ categoryId, onClose }) => {
  const [subCategoryNames, setSubCategoryNames] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("subCategoryNames", subCategoryNames);
    formData.append("parentCategoryId", categoryId);

    try {
      const response = await fetch(
        `http://localhost:8080/api/subcategroy/save/${categoryId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Subcategory saved successfully");
        toast.success("Subcategory saved successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        onClose();
      } else {
        console.error("Failed to save subcategory");
        toast.error("Failed to save subcategory", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save subcategory", {
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

  const handleSubCategoryNamesChange = (e) => {
    const value = e.target.value;

    // Check if the entered text is valid
    if (isTextValid(value) || value === "") {
      setSubCategoryNames(value);
    }
  };
  return (
    <div className="modal-container">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" onClick={handleModalClick}>
          <h5 className="text-center" style={{ color: "black" }}>
            Add Subcategory
          </h5>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {" "}
              {/* Use Grid container */}
              <Grid item xs={12}>
                {" "}
                {/* Full width for input */}
                <div className="form-group">
                  <TextField
                    type="text"
                    id="subCategoryNames"
                    value={subCategoryNames}
                    onChange={handleSubCategoryNamesChange}

                    fullWidth
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    InputProps={{
                      style: { color: "black" },
                    }}
                    label="SubcategoryName"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                {" "}
                {/* Full width for buttons */}
                <div
                  className="d-flex justify-content-between"
                  style={{ marginBottom: "10px" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ width: "40%", height: "20%", marginLeft: "10px" }}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    onClick={onClose}
                    variant="contained"
                    color="secondary"
                    style={{ width: "40%", marginRight: "10px" }}
                  >
                    Cancel
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubcategoryForm;