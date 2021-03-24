import React from 'react'
import Nav from "react-bootstrap/Nav";

const NavRight = () => {
  return (
    <Nav>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link eventKey={2} href="/register">
          Signup
      </Nav.Link>
    </Nav>
  )
}

export default NavRight
