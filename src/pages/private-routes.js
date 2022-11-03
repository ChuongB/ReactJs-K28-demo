import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../App";

const PrivateRoutes = () => {
  const {
    state: { isLoggedIn },
  } = useAppContext();

  return isLoggedIn ? <Outlet /> : <Navigate to="/home" />;
};

export default PrivateRoutes;
