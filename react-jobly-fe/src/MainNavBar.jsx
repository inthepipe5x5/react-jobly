/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  NavLink as BSNavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import "./MainNavBar.css";

const MainNavBar = ({ user = null }) => {
  const userLink = user ? (
    <>
      <NavItem>
        <BSNavLink tag={Link} to={`/users/${user.username}`}>{user.username}</BSNavLink>
      </NavItem>
      <NavItem>
        <BSNavLink tag={Link} to="/logout">Logout</BSNavLink>
      </NavItem>
    </>
  ) : (
    <>
      <NavItem>
        <BSNavLink tag={Link} to="/signup">Sign up</BSNavLink>
      </NavItem>
      <NavItem>
        <BSNavLink tag={Link} to="/login">Log In</BSNavLink>
      </NavItem>
    </>
  );

  return (
    <Navbar color="light" light expand="md" className="mb-4">
      <NavbarBrand tag={Link} to="/">Jobly</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <BSNavLink tag={Link} to="/users">Users</BSNavLink>
        </NavItem>
        <NavItem>
          <BSNavLink tag={Link} to="/companies">Companies</BSNavLink>
        </NavItem>
        <NavItem>
          <BSNavLink tag={Link} to="/jobs">Jobs</BSNavLink>
        </NavItem>
        <NavItem>
          <BSNavLink tag={Link} to="/submit">Submit A Job</BSNavLink>
        </NavItem>
        {userLink}
      </Nav>
    </Navbar>
  );
}

export default MainNavBar;
