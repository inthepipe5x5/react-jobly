/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink as BSNavLink,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./MainNavBar.css";
import { useUserContext } from "./useUserContext";

const MainNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpenState = () => setIsOpen(!isOpen);
  const { currentUser: user, logoutUser } = useUserContext();

  return (
    <Navbar color="light" light expand="sm" className="mb-4">
      <NavbarBrand tag={Link} to="/">
        Jobly
      </NavbarBrand>
      <NavbarToggler onClick={toggleOpenState} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <BSNavLink tag={Link} to="/users">
              Users
            </BSNavLink>
          </NavItem>
          <NavItem>
            <BSNavLink tag={Link} to="/companies">
              Companies
            </BSNavLink>
          </NavItem>
          <NavItem>
            <BSNavLink tag={Link} to="/jobs">
              Jobs
            </BSNavLink>
          </NavItem>
          <NavItem>
            <BSNavLink tag={Link} to="/jobs/new">
              Submit A Job
            </BSNavLink>
          </NavItem>
        </Nav>
        <Nav className="ms-auto" navbar>
          {user ? (
            <>
              <NavItem>
                <BSNavLink tag={Link} to={`/users/${user.username}`}>
                  {user.username}
                </BSNavLink>
              </NavItem>
              <NavItem>
                <Button
                  onClick={() => {
                    logoutUser();
                  }}
                >
                  Logout
                </Button>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <BSNavLink tag={Link} to="/signup">
                  Sign up
                </BSNavLink>
              </NavItem>
              <NavItem>
                <BSNavLink tag={Link} to="/login">
                  Log In
                </BSNavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default MainNavBar;
