import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ roles }) => {
  const { token, details } = useSelector((s) => s.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(details?.role)) {
    return <Navigate to="/dashboard/blogs" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
