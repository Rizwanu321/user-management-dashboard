import React, { useState, useEffect } from "react";
import { validateUserData } from "../../utils/validation";

const UserForm = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors } = validateUserData(formData);

    if (!isValid) {
      setErrors(errors);
      return;
    }

    onSubmit(formData);
  };

  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];

  return (
    <form onSubmit={handleSubmit} className="px-2">
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input
          type="text"
          className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          value={formData.firstName || ""}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        {errors.firstName && (
          <div className="invalid-feedback">{errors.firstName}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input
          type="text"
          className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
          value={formData.lastName || ""}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        {errors.lastName && (
          <div className="invalid-feedback">{errors.lastName}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Department</label>
        <select
          className={`form-select ${errors.department ? "is-invalid" : ""}`}
          value={formData.department || ""}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        {errors.department && (
          <div className="invalid-feedback">{errors.department}</div>
        )}
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {user ? "Update" : "Create"} User
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
