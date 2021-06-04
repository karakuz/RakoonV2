import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const DropDown = () => {
  const [categories, setcategories] = useState([]);
  const PORT = process.env.PORT || 4000;
  var url = (process.env.NODE_ENV === "production") ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";

  const getcategories = async () => {
    const res = await Axios({
      method: "GET",
      withCredentials: true,
      url: `${url}/categories`,
    });
    setcategories(res.data);
  };

  useEffect(() => {
    getcategories();
  }, []);

  return (
    <NavDropdown title="Categories" id="collasible-nav-dropdown" style={{textAlign: "center", margin: "0"}}>
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
