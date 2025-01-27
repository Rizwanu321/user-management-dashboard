import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const UserList = ({ users, onEdit, onDelete }) => {
  const [expandedUser, setExpandedUser] = useState(null);

  const UserCard = ({ user }) => (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="card-title mb-0">ID: {user.id}</h6>
          <button
            className="btn btn-link p-0 text-secondary"
            onClick={() =>
              setExpandedUser(expandedUser === user.id ? null : user.id)
            }
          >
            {expandedUser === user.id ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className={`collapse ${expandedUser === user.id ? "show" : ""}`}>
          <div className="mb-2">
            <strong>First Name:</strong> {user.firstName}
          </div>
          <div className="mb-2">
            <strong>Last Name:</strong> {user.lastName}
          </div>
          <div className="mb-2">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="mb-2">
            <strong>Department:</strong> {user.department}
          </div>
          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => onEdit(user)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(user)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(user)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="d-md-none">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
