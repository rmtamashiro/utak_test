import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavigationBar: React.FC = () => {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand href="#home">Savory Palette</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Dashboard</Nav.Link>
          <Nav.Link href="#features">Category</Nav.Link>
          <Nav.Link href="#items">Items</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
