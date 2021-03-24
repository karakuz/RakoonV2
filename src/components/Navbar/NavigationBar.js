import Navbar from "react-bootstrap/Navbar";
import { Link } from 'react-router-dom';
import RakoonLogo from '../rakoon_logo/RakoonLogo';
import NavLeft from './NavLeft';
import NavRight from './NavRight';

const NavigationBar = (props) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand href="/">
                <RakoonLogo/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <NavLeft numOfItems={props.numOfItems} setNumOfItems={props.setNumOfItems}/>
                <NavRight/>
            </Navbar.Collapse>
        </Navbar>
    );

}

export default NavigationBar;