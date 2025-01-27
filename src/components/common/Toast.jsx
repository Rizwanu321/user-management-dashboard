import React, { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-success"
      : type === "error"
      ? "bg-danger"
      : "bg-info";

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1070 }}>
      <div className={`toast show ${bgColor} text-white`} role="alert">
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
};

export default Toast;
