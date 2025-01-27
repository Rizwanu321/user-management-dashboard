export const validateUserData = (userData) => {
  const errors = {};

  if (!userData.firstName?.trim()) errors.firstName = "First Name is required";
  if (!userData.lastName?.trim()) errors.lastName = "Last Name is required";
  if (!userData.email?.trim()) errors.email = "Email is required";
  if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
    errors.email = "Invalid email format";
  }
  if (!userData.department) errors.department = "Department is required";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
