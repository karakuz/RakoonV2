import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const DropDown = () => {
  const [categories, setcategories] = useState([]);
  const PORT = process.env.PORT || 4000;
  const getcategories = async () => {
    const res = await Axios({
      method: "GET",
      withCredentials: true,
      url: `/categories`,
    });
    setcategories(res.data);

  };
  useEffect(() => {
    getcategories();
  }, []);

  return (
    <NavDropdown title="Categories" id="collasible-nav-dropdown">
      {
        categories.map((category) => {
          const url = `/category/${category.category}`
          return <NavDropdown.Item href={url} style={{ fontSize: "20px" }} key={category.category}>{category.category} </NavDropdown.Item>
        })
      }
    </NavDropdown>
  )
}

export default DropDown
