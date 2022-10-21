import {
  AppBar,
  CssBaseline,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
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

  return (
    <StyledAppBar position="static">
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
          <NavLink to="/contact" className={classes.link}>
            Contact
          </NavLink>
        </div>
      </Toolbar>
    </StyledAppBar>
  );
}
export default Navbar;
