import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import "../../assets/css/ViewUsers.css";

const ViewUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/users/all"
      );

      setUsers(res.data.users);

    } catch (error) {
      console.log(error);
    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this user?")) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/users/delete/${id}`
      );

      fetchUsers();

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="viewbook-wrapper mt-5">

      <div className="viewbook-card">

        <div className="viewbook-header">
          <h2>Users List</h2>
        </div>

        <table className="viewbook-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {users.length > 0 ? (

              users.map((user, index) => (

                <tr key={user._id}>

                  <td>{index + 1}</td>

                  <td>
                    {user.profileImage ? (
                      <img
                        src={`http://localhost:5000/uploads/${user.profileImage}`}
                        alt="user"
                        className="user-img"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.dob}</td>
                  <td>{user.gender}</td>
                  <td title={user.address}>
                    {user.address?.length > 20
                      ? user.address.slice(0, 20) + "..."
                      : user.address}
                  </td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrash /> Delete
                    </button>

                    <button className="btn btn-warning btn-sm">
                      <FaEdit /> Edit
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="9" className="text-center">
                  Data NOT Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
};

export default ViewUsers;