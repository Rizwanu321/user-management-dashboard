import React, { useState, useEffect } from "react";
import UserList from "./components/users/UserList";
import UserModal from "./components/users/UserModal";
import DeleteConfirmModal from "./components/users/DeleteConfirmModal";
import Loading from "./components/common/Loading";
import ErrorMessage from "./components/common/ErrorMessage";
import Toast from "./components/common/Toast";
import Pagination from "./components/common/Pagination";
import { getUsers, createUser, updateUser, deleteUser } from "./services/api";

const USERS_PER_PAGE = 5;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState(null);
  const [nextId, setNextId] = useState(11);

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const clearModals = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setEditingUser(null);
    setUserToDelete(null);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();

      const transformedData = data.map((user) => ({
        id: user.id,
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1] || "",
        email: user.email,
        department: "Engineering",
      }));

      const sortedUsers = transformedData.sort((a, b) => b.id - a.id);
      setUsers(sortedUsers);

      const maxId = Math.max(...transformedData.map((user) => user.id), 10);
      setNextId(maxId + 1);
    } catch (err) {
      setError("Failed to fetch users");
      showToast("Error loading users", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const newId = nextId;

      const apiUserData = {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        department: userData.department,
        username: userData.email.split("@")[0],
      };

      await createUser(apiUserData);

      const newUser = {
        ...userData,
        id: newId,
      };

      setUsers([newUser, ...users]);
      setNextId(newId + 1);
      clearModals();
      showToast("User created successfully!", "success");

      if (currentPage !== 1) {
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Create user error:", err);
      showToast("Failed to create user", "error");
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const apiUserData = {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        department: userData.department,
        username: userData.email.split("@")[0],
      };

      await updateUser(editingUser.id, apiUserData);

      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...userData, id: user.id } : user
        )
      );
      clearModals();
      showToast("User updated successfully!", "success");
    } catch (err) {
      console.error("Update user error:", err);
      showToast("Failed to update user", "error");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(userToDelete.id);
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      clearModals();
      showToast("User deleted successfully!", "success");

      const remainingUsers = users.length - 1;
      const maxPages = Math.ceil(remainingUsers / USERS_PER_PAGE);
      if (currentPage > maxPages && maxPages > 0) {
        setCurrentPage(maxPages);
      }
    } catch (err) {
      console.error("Delete user error:", err);
      showToast("Failed to delete user", "error");
    }
  };

  const paginatedUsers = users.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <Loading />;

  return (
    <div className="container-fluid py-4 px-3 px-md-5">
      <h1 className="h2 mb-4">User Management Dashboard</h1>
      {error && <ErrorMessage message={error} />}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          Add New User
        </button>

        {totalPages > 1 && (
          <div className="d-md-none">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <UserList
        users={paginatedUsers}
        onEdit={(user) => {
          setEditingUser(user);
          setShowModal(true);
        }}
        onDelete={(user) => {
          setUserToDelete(user);
          setShowDeleteModal(true);
        }}
      />

      {totalPages > 1 && (
        <div className="d-none d-md-flex justify-content-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <UserModal
        show={showModal}
        user={editingUser}
        onClose={() => {
          setShowModal(false);
          setEditingUser(null);
        }}
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onClose={() => {
          setShowDeleteModal(false);
          setUserToDelete(null);
        }}
      />
    </div>
  );
}

export default App;
