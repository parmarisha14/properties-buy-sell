import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/ViewUsers.css";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/all-users");

      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/auth/delete-user/${id}`);

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  
  const editUser = (id) => {
    window.location.href = `/edit-user/${id}`;
  };

  return (
    <div className="view-wrapper">
      <h2 className="title">Users List</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>

              <td>
                <img
                  src={`http://localhost:5000/uploads/users/${user.profileImage}`}
                  alt="user"
                  className="profile-img"
                />
              </td>

              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.gender}</td>
              <td>{user.address}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
