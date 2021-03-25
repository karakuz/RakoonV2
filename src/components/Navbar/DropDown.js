import React from 'react'
import NavDropdown from "react-bootstrap/NavDropdown";

const DropDown = () => {
  return (
    <NavDropdown title="Categories" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">Category1</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Category2</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">Category3</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    </NavDropdown>
  )
}

export default DropDown
