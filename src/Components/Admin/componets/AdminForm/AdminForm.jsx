import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AdminForm = () => {
  const [formData, setFormData] = useState({
    adminName: "",
    contact: 0,
    address: "",
    password: "",
    websiteUrl: "",
    privacyAndPolices: "",
    aboutUs: "",
    role: "ROLE_ADMIN",
  });
  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateContact = () => {
    if (!/^[6-9]\d{9}$/.test(formData.contact.toString())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact: "Contact must start with 6 and be 10 digits long.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, contact: "" }));
    }
  };

  const validatePassword = () => {
    if (
      !/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&()_+])[A-Za-z\d!@#$%^&()_+]{8,}$/.test(
        formData.password
      )
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };
  const validateAdminName = () => {
    if (!/^[a-zA-Z ]{3,}$/.test(formData.adminName)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        adminName: "Admin name should contain at least three alphabets.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, adminName: "" }));
    }
  };
  

  const validateAboutUs = () => {
    // No specific validation for aboutUs, it allows all characters
    setErrors((prevErrors) => ({ ...prevErrors, aboutUs: "" }));
  };

  const validateAddress = () => {
    // Allow all characters, but limit to 2 lines
    const lines = formData.address.split("\n");
    if (lines.length > 2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "Address should be limited to 2 lines.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, address: "" }));
    }
  };

  const validateFormData = () => {
    validateContact();
    validatePassword();
    validateAdminName();
    validateAboutUs();
    validateAddress();
    // Add validations for other fields as needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    if (Object.keys(errors).some((key) => errors[key] !== "")) {
      console.error("Form has errors. Cannot submit.");
      return;
    }

    if (file) {
      formDataToSend.append("file", file);
    }

    try {
      const response = await fetch("http://localhost:8080/api/admin/save", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        console.log("Data saved successfully");
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear validation errors on change
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="admin-form"
      style={{
        width: "80%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h4>Admin Profile</h4>
      <Row>
        <Col>
          <Form.Group controlId="adminName">
            <Form.Control
              type="text"
              placeholder="Admin Name"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              onBlur={validateAdminName}
            />
            <Form.Text className="text-danger">{errors.adminName}</Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="contact">
            <Form.Control
              type="number"
              placeholder="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              onBlur={validateContact}
              style={{ width: "95%" }}
            />
            <Form.Text className="text-danger">{errors.contact}</Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="websiteUrl">
            <Form.Control
              type="text"
              placeholder="Website URL"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="password">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={validatePassword}
            />
            <Form.Text className="text-danger">{errors.password}</Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="address">
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <Form.Text className="text-danger">{errors.address}</Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="privacyAndPolices">
            <Form.Control
              type="text"
              placeholder="Privacy & Policies"
              name="privacyAndPolices"
              value={formData.privacyAndPolices}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group controlId="aboutUs">
            <Form.Control
              type="text"
              placeholder="About Us"
              name="aboutUs"
              value={formData.aboutUs}
              onChange={handleChange}
            />
            <Form.Text className="text-danger">{errors.aboutUs}</Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="fileupload">
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              name="file"
              style={{ width: "95%" }}
            />
          </Form.Group>
        </Col>
      </Row>

      <Button
        type="submit"
        variant="primary"
        style={{ alignSelf: "center",textAlign:"center", width: "20%" }}
      >
        Save
      </Button>
    </Form>
  );
};

export default AdminForm;