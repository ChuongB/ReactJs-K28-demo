import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import StoreIcon from "@mui/icons-material/Store";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledMenu = styled(MenuList)`
  a {
    text-decoration: none;
    color: black;
  }
`;

const AdminMenu = () => {
  return (
    <div>
      <StyledMenu
        style={{
          width: "240px",
          borderRight: "1px solid #e1e1e1",
          height: "100%",
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <StoreIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Link to="/admin/products">Products</Link>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {" "}
            <Link to="/admin/users">Users</Link>
          </ListItemText>
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default AdminMenu;
