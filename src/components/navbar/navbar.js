import {
  AppBar,
  CssBaseline,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../App";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const StyleAppBar = styled(AppBar)`
  .active {
    color: yellow;
  }
`;

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const {
    state: { cart },
  } = useContext(AppContext);

  function getToTal() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
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
              <AccountCircleIcon sx={{ color: "white" }} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/login">Login</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/signup">Signup</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
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
