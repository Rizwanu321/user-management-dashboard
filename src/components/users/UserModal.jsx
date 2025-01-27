import React from "react";
import UserForm from "./UserForm";

const UserModal = ({ show, user, onClose, onSubmit }) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {user ? "Edit User" : "Add New User"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <UserForm user={user} onSubmit={onSubmit} onCancel={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
