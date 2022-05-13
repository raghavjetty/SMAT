import jwt_decode from "jwt-decode";
export const logout = () => {
  localStorage.removeItem("token");
};

export const isLogin = () => {
  if (
    localStorage.getItem("userName") &&
    localStorage.getItem("userPassword")
  ) {
    return true;
  }
};

export let getMenu = () => {
  if (localStorage.getItem("customMenu")) {
    const customMenu = localStorage.getItem("customMenu");
    // console.log(customMenu);
    return customMenu;
  }
};
