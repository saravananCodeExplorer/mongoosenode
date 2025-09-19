import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", age: "", city: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:8080/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  };

 // Delete user with confirmation
const deleteUser = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  if (confirmDelete) {
    axios.delete(`http://localhost:8080/users/${id}`)
      .then(() => fetchUsers())
      .catch(error => console.error("Error deleting user:", error));
  }
};
    

  // Start editing
  const startEdit = (user) => {
    setEditingUser(user._id);
    setFormData({ name: user.name, age: user.age, city: user.city });
  };

  // Update user
  const updateUser = (id) => {
    axios.put(`http://localhost:8080/users/${id}`, formData)
      .then(() => {
        setEditingUser(null);
        fetchUsers();
      })
      .catch(error => console.error("Error updating user:", error));
  };

  // CSS styles stored in variables
  const tableStyle = {
    width: "90%",
    margin: "20px auto",
    borderCollapse: "collapse",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
  };

  const thStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px",
    textAlign: "center"
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "center"
  };

  const trHover = {
    backgroundColor: "#f5f5f5"
  };

  const buttonStyle = {
    margin: "5px",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  };

   const addBTn = { ...buttonStyle, backgroundColor: "#00569cff", color: "white" };
  const editBtn = { ...buttonStyle, backgroundColor: "#2196F3", color: "white" };
  const deleteBtn = { ...buttonStyle, backgroundColor: "#f44336", color: "white" };
  const saveBtn = { ...buttonStyle, backgroundColor: "#4CAF50", color: "white" };
  const cancelBtn = { ...buttonStyle, backgroundColor: "#9E9E9E", color: "white" };

  return (
    <div style={{ textAlign: "center" }}>
      
      <h1>Users List</h1>
        <Link to='/add' style={addBTn}>AddUser</Link>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>SNo:</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Age</th>
              <th style={thStyle}>City</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} style={index % 2 === 0 ? {} : trHover}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>
                  {editingUser === user._id ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td style={tdStyle}>
                  {editingUser === user._id ? (
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  ) : (
                    user.age
                  )}
                </td>
                <td style={tdStyle}>
                  {editingUser === user._id ? (
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  ) : (
                    user.city
                  )}
                </td>
                <td style={tdStyle}>
                  {editingUser === user._id ? (
                    <>
                      <button style={saveBtn} onClick={() => updateUser(user._id)}>Save</button>
                      <button style={cancelBtn} onClick={() => setEditingUser(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button style={editBtn} onClick={() => startEdit(user)}>Edit</button>
                      <button style={deleteBtn} onClick={() => deleteUser(user._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewUsers;
