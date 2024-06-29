import React, { useRef, useState } from "react";
import {
  Nav,
  // Form,
  // NavBar,
  // Button,
  // Offcanvas,
  // NavDropdown,
  // Container,
} from "react-strap";
import { Link } from "react-router-dom";
function MainNavBar({ user = null }) {
  const userLink = user ? (
    <>
      <Link eventKey={`/users/${user.id}`}>${user.username}</Link>
      <Link eventKey="/logout">Logout</Link>
    </>
  ) : (
    <>
      <Link eventKey="/signup">Sign up</Link>
      <Link eventKey="/login">Log In</Link>
    </>
  );

  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Link href="/">Jobly</Link>
      <Link eventKey="/users">Users</Link>
      <Link eventKey="/companies">Companies</Link>
      <Link eventKey="/jobs">Jobs</Link>
      <Link eventKey="/submit">Submit A Job</Link>
      {userLink}
    </Nav>
  );

  // return (
  //   <>
  //     <Navbar
  //       key={expand}
  //       expand={expand}
  //       className="bg-body-tertiary mb-3"
  //       fixed="top"
  //     >
  //       <Container fluid>
  //         <Navbar.Brand href="/">Jobly</Navbar.Brand>
  //         <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} />
  //         <Navbar.Offcanvas
  //           id={`offcanvasNavbar-expand-xl`}
  //           aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
  //           placement="end"
  //         >
  //           <Offcanvas.Header closeButton>
  //             <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
  //               Offcanvas
  //             </Offcanvas.Title>
  //           </Offcanvas.Header>
  //           <Offcanvas.Body>
  //             <Nav className="justify-content-end flex-grow-1 pe-3">
  //               <Nav.Link href="#action1">
  //                 <Link href="/">Jobly</Link>
  //               </Nav.Link>
  //               <Nav.Link href="/users">
  //                 {" "}
  //                 <Link eventKey="/users">Users</Link>
  //               </Nav.Link>
  //               <Nav.Link>
  //                 <Link eventKey="/Companies">Companies</Link>
  //               </Nav.Link>
  //               <Nav.Link>
  //                 <Link eventKey="link-3">Jobs</Link>
  //               </Nav.Link>
  //               <Nav.Link>
  //                 <Link eventKey="link-4">Submit A Job</Link>
  //               </Nav.Link>
  //               <NavDropdown
  //                 title="Dropdown"
  //                 id={`offcanvasNavbarDropdown-expand-xl`}
  //               >
  //                 <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
  //                 <NavDropdown.Item href="#action4">
  //                   Another action
  //                 </NavDropdown.Item>
  //                 <NavDropdown.Divider />
  //                 <NavDropdown.Item href="#action5">
  //                   Something else here
  //                 </NavDropdown.Item>
  //               </NavDropdown>
  //             </Nav>
  //             <Form className="d-flex">
  //               <Form.Control
  //                 type="search"
  //                 placeholder="Search"
  //                 className="me-2"
  //                 aria-label="Search"
  //               />
  //               <Button variant="outline-success">Search</Button>
  //             </Form>
  //           </Offcanvas.Body>
  //         </Navbar.Offcanvas>
  //       </Container>
  //     </Navbar>
  //     ))}
  //   </>
  // );
}

export default MainNavBar;
