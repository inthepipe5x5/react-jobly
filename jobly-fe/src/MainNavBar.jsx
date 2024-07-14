import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import "./MainNavBar.css";
import { useUserContext } from "./useUserContext";
import { useFlashMessage } from "./FlashMessageContext";
const MainNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpenState = () => setIsOpen(!isOpen);
  const { currentUser, logoutUser } = useUserContext();
  const { showFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    showFlashMessage("Logout successful", "Hope to see you again soon!", "success")
    navigate("/login");
  };
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
          {currentUser && currentUser.username ? (
            <>
              <NavItem>
                <BSNavLink tag={Link} to={`/profile`}>
                  {currentUser.username}
                </BSNavLink>
              </NavItem>
              <NavItem>
                <Button onClick={handleLogout}>Logout</Button>
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
