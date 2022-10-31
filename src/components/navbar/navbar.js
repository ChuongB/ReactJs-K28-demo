import {
  AppBar,
  CssBaseline,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../App";
import { actionTypes } from "../../store/reducer";

const StyleAppBar = styled(AppBar)`
  .active {
    color: yellow;
  }
  .login {
    text-decoration: none;
    color: black;
  }
`;

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
    gap: "50px",
    alignItems: "center",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
      textDecoration: "none !important",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const {
    state: { cart, user, isLoggedIn },
    dispatch,
  } = useContext(AppContext);
  function getToTal() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }
  function handleLogout() {
    dispatch({ type: actionTypes.LOGOUT, payload: null });
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyleAppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Navbar
        </Typography>
        <div className={classes.navlinks}>
          <NavLink to="/home" className={classes.link}>
            Home
          </NavLink>
          <NavLink to="/product" className={classes.link}>
            Product
          </NavLink>
          <NavLink className={classes.link}>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <AccountCircleIcon sx={{ color: "white" }} />{" "}
              {user && (
                <span
                  style={{
                    color: "white",
                    textTransform: "capitalize",
                    marginLeft: "10px",
                    fontSize: "16px",
                  }}
                >
                  Hello, {user.fullname}
                </span>
              )}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{ sx: { width: "150px" } }}
            >
              {isLoggedIn && (
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    My Profile
                  </Link>
                </MenuItem>
              )}

              {isLoggedIn && (
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/admin"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Admin
                  </Link>
                </MenuItem>
              )}

              {isLoggedIn && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleLogout();
                  }}
                >
                  Logout
                </MenuItem>
              )}

              {!isLoggedIn && (
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Login
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </NavLink>
          <NavLink to="/cart" className={classes.link}>
            <IconButton aria-label="cart" sx={{ margin: "-10px" }}>
              <Badge badgeContent={getToTal()} color="success">
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
          </NavLink>
        </div>
      </Toolbar>
    </StyleAppBar>
  );
}
export default Navbar;
