import React, { useState } from "react";
import "./contactus.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phoneNumber", formData.phoneNumber);
      form.append("message", formData.message);

      const response = await fetch("http://localhost:8080/api/enqiures/save", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        // Handle success
        console.log("Data submitted successfully");
        toast.success("Data submitted successfully", {
            position: "top-right",
          });
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      } else {
        // Handle error
        console.error("Error submitting data");
        toast.error("Error submitting data", {
            position: "top-right",
          });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network error. Please try again later.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="container-fluid overalldiv">
      <div className="row">
        <div className="col-md-6 left">
          <div className="row para">
            <h1 className="Budapest">Hand Made Wonders</h1>
            <br />

            <p>
              <i className="fa fa-envelope icon list-icon"></i>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;thehomemadewonders@gmail.com 
            </p>
            <p>
              <i
                className="fa fa-phone icon list-icon"
                aria-hidden="true"
              ></i>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8712655810
            </p>
            <p>
              <i className="fa fa-map-marker icon list-icon"></i>
              &nbsp;Door No: 16-1-30/A/7
Lokayukta Colony
Saidabad
Hyderabad
India
Pincode: 500059
            </p>
          </div>
        </div>

        <div className="col-md-6 right">
          <h1 className="contactus">Contactus</h1>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ width: "100%", height: "50px" }}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Contact Number</label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                style={{ width: "100%", height: "50px" }}
                placeholder="Enter your contact number"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{ width: "100%", height: "50px" }}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                style={{ width: "100%", height: "140px" }}
                placeholder="Enter your message"
                required
              ></textarea>
            </div>
            <button type="submit" className="custom-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
