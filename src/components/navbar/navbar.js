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
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";


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
  const { cart } = useSelector((state) => state.product);
  const classes = useStyles();

  function getToTal() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

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
          <NavLink to="/about" className={classes.link}>
            About
          </NavLink>
          <NavLink to="/cart" className={classes.link}>
            <IconButton aria-label="cart" sx={{margin:"-10px"}}>
              <Badge badgeContent={getToTal()} color="success">
                <ShoppingCartIcon sx={{color:"white"}}/>
              </Badge>
            </IconButton>
          </NavLink>
        </div>
      </Toolbar>
    </StyleAppBar>
  );
}
export default Navbar;
