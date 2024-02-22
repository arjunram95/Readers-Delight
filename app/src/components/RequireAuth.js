import { useLocation, Navigate, Outlet } from "react-router";
// import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  // const { auth, setAuth } = useAuth();
  const user = localStorage.getItem("user");
  const location = useLocation();
  console.log("Require Auth: ", user);
  console.log("Local Storage: ", localStorage.getItem("user"));
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
