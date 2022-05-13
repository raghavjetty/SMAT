import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./component/privateRoute";
import "./custom.css";
import "./custom.scss";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import Stores from "./pages/stores/storesList";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/stores"
          element={
            <PrivateRoute>
              <Stores />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} exact />
        <Route path="/stores" element={<Stores />} exact />

        <Route path="/" element={<RegistrationPage />} exact />
      </Routes>
    </>
  );
}

export default App;
