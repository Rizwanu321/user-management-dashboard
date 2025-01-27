const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

export const createUser = async (userData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Failed to create user");
  return response.json();
};

export const updateUser = async (id, userData) => {
  if (id > 10) {
    return Promise.resolve({ ...userData, id });
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Failed to update user");
  return response.json();
};

export const deleteUser = async (id) => {
  if (id > 10) {
    return Promise.resolve(true);
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete user");
  return true;
};
