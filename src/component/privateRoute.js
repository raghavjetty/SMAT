import { Route, Navigate } from "react-router-dom";

import { isLogin } from "../utils";

function PrivateRoute({ children }) {
  const auth = isLogin();
  console.log(auth);
  return auth ? children : <Navigate to="/" />;
}

export default PrivateRoute;
