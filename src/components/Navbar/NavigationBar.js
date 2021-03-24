import React, { useEffect, useRef } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from 'react-router-dom';

const NavigationBar = (props) => {
    const ref = useRef(false);
    const Cart = (localStorage.length>0)?`Cart(${localStorage.length})`:'Cart';
    props.setNumOfItems(localStorage.length);
    useEffect(()=>{
        console.log(`useEffect num: ${props.numOfItems}`);
        if(ref.current){
            let text = document.getElementById('cart').innerHTML;
            if(props.numOfItems===0) text=`Cart`;
            else if(!text.includes('(')) text += ` (${props.numOfItems})`;
            else text = text.split('(')[0] + '(' + props.numOfItems + ')';
            document.getElementById('cart').innerHTML = text;
        } else ref.current = true;
    },[props.numOfItems]);
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Rakoon</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/cart" id="cart">{`${Cart}`}</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Categories" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Category1</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Category2</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Category3</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link eventKey={2} href="/register">
                        Signup
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

}

export default NavigationBar;