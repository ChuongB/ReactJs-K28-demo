import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import * as React from "react";
import { Link } from "react-router-dom";
export default function AminMenu() {
  return (
    <MenuList style={{ width: "250px", borderRight: "1px solid #dddddd" }}>
      <MenuItem>
        <ListItemIcon>
          <GroupIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Link
            to="/admin/users"
            style={{ textDecoration: "none", color: "black" }}
          >
            User
          </Link>
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <LocalMallIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Link
            to="/admin/products"
            style={{ textDecoration: "none", color: "black" }}
          >
            Product
          </Link>
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <CategoryIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Link
            to="/admin/category"
            style={{ textDecoration: "none", color: "black" }}
          >
            Category
          </Link>
        </ListItemText>
      </MenuItem>
    </MenuList>
  );
}
