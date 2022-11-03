import Box from "@mui/material/Box";
import AminMenu from "../components/management/admin-menu";
import { Outlet } from "react-router-dom";
const AdminPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AminMenu />
      <Box sx={{ flex: "1" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminPage;
