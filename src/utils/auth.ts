export const checkAuth = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export const setAuth = (value: "true" | "false") => {
  localStorage.setItem("isAuthenticated", value);
};
