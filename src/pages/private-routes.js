import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const isAuth = false;

  return isAuth ? <Outlet /> : <Navigate to="/home" />;
};

export default PrivateRoutes;
