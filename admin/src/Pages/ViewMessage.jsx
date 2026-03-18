import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/ViewUsers.css"; // same CSS use

const ViewMessage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setContacts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE CONTACT
  const deleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      fetchContacts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="view-wrapper">
      <h2 className="title">Contact Messages</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.subject}</td>
              <td className="message-cell">{item.message}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteContact(item._id)}
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

export default ViewMessage;