import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUsers() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/adduser", formData)
      .then(res => {
        alert(res.data.message);
        navigate('/')
        setFormData({ name: "", age: "", city: "" }); // reset form
      })
      .catch(err => {
        console.error("Error adding user:", err);
      });
  };

  // CSS variables
  const formStyle = {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "4px"
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  };

  return (
    <div style={formStyle}>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="text"
          name="city"
          placeholder="Enter City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <button type="submit" style={buttonStyle}>Add User</button>
      </form>
    </div>
  );
}

export default AddUsers;
