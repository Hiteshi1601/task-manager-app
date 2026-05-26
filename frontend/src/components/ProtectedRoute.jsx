import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const userInfo = localStorage.getItem(
    "userInfo"
  );

  return userInfo
    ? children
    : <Navigate to="/" />;
}

export default ProtectedRoute;