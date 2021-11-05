const isAdmin = () => {
  let userType = localStorage.getItem("userType");
  return userType === "admin";
};

export default isAdmin;
