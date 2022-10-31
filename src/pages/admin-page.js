import { Outlet } from "react-router-dom";
import AdminMenu from "../components/management/admin-menu";

export default function AdminPage() {
  return (
    <div style={{ display: "flex" }}>
      <AdminMenu />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
