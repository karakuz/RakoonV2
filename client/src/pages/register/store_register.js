import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Axios from 'axios';
import redX from '../css/redX.jpg';
import greenTick from '../css/greenTick.png';
import '../css/register.css';

const Store_Register = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerSurname, setRegisterSurname] = useState("");
  const [storeName, setStoreName] = useState("");
  const PORT = process.env.PORT || 4000;
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    if (document.querySelector('#formBasicPassword').value !== document.querySelector('#formBasicPassword2').value) {
      document.querySelector('#doesNotMatch').style.display = 'flex';
      setTimeout(() => {
        document.querySelector('#doesNotMatch').style.display = 'none';
      }, 3000);
      return;
    }
    else if (document.querySelector('#formBasicPassword').value.length < 6) {
      document.querySelector('#min6Char').style.display = 'flex';
      setTimeout(() => {
        document.querySelector('#min6Char').style.display = 'none';
      }, 3000);
      return;
    }
    else if (document.querySelector('#firstName').value.length < 3 || document.querySelector('#lastName').value.length < 3) {
      document.querySelector('#nameError').style.display = 'flex';
      setTimeout(() => {
        document.querySelector('#nameError').style.display = 'none';
      }, 3000);
      return;
    }
    else if (document.querySelector('#storeName').value.length < 3) {
      document.querySelector('#storeNameError').style.display = 'flex';
      setTimeout(() => {
        document.querySelector('#storeNameError').style.display = 'none';
      }, 3000);
      return;
    }

    document.querySelector('#submit').disabled = true;
    document.querySelectorAll('input').forEach(input => input.disabled = true);

    const res = await Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
        name: registerName,
        surname: registerSurname,
        storeName: storeName
      },
      withCredentials: true,
      url: `/store_register`,
    });
    if (res.data.res === "exists") {
      document.querySelector('#exists').style.display = 'flex';
      document.querySelector('#submit').disabled = false;
      document.querySelectorAll('input').forEach(input => input.disabled = false);
      setTimeout(() => {
        document.querySelector('#exists').style.display = 'none';
      }, 3000);
    }
    else if (res.data) {
      document.querySelector('#success').style.display = 'flex';
      setTimeout(() => {
        document.querySelector('#success').style.display = 'none';
        history.push('/login');
      }, 3000);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="form_container" style={{ width: '590px', margin: '0 auto', fontSize: '2em', position: 'relative' }}>
        <div style={{ display: 'none', position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='exists'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px' }}>
            <span style={{ fontSize: '20px' }}>User already exists</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'none', padding: '10px', position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='success'>
          <img src={greenTick} alt="success" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px', marginLeft: '10px', lineHeight: '0.9' }}>
            <span style={{ fontSize: '20px' }}>An email has been sent to {registerUsername} for activation</span>
            <div className="progress-bar-success">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'none', position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='doesNotMatch'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px' }}>
            <span style={{ fontSize: '20px' }}>Passwords does not match</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'none', position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='min6Char'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px' }}>
            <span style={{ fontSize: '17px' }}>Password should be minimum 6 characters</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'none', position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='nameError'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px' }}>
            <span style={{ fontSize: '17px' }}>Your name or surname can not be empty</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'none', position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='storeNameError'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px' }}>
            <span style={{ fontSize: '18px' }}>Type your store's name</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1em', width: '100%', borderBottom: '1px solid grey' }}>
          <Nav style={{ display: 'flex', width: '100%' }}>
            <Nav.Link style={{ borderRight: '1px solid grey', flex: '1', textAlign: 'center' }} href="/login">LOGIN</Nav.Link>
            <Nav.Link eventKey={2} href="/register" style={{ flex: '1', textAlign: 'center', background: 'rgb(225,225,225)' }}>SIGN UP</Nav.Link>
          </Nav>
        </div>
        <Form style={{ margin: "0 auto", width: "500px" }}>
          <Form.Group controlId="formBasicEmail" style={{ position: "relative" }}>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setRegisterUsername(e.target.value)} style={{ width: "332px", border: '1px solid grey' }} />
            <span style={{ color: "darkgrey", fontSize: "14px", position: "absolute", bottom: "-15px", right: "-2px" }}>
              We'll never share your email with anyone else.
            </span>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setRegisterPassword(e.target.value)} style={{ width: "332px", border: '1px solid grey' }} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword2">
            <Form.Label>Password(*)</Form.Label>
            <Form.Control type="password" placeholder="Password" style={{ width: "332px", border: '1px solid grey' }} />
          </Form.Group>
          <Row style={{ width: "430px", marginLeft: "auto", display: "flex", justifyContent: "space-between", position: 'relative' }}>
            <Col>
              <Form.Control placeholder="First name" onChange={(e) => setRegisterName(e.target.value)} style={{ border: '1px solid grey' }} id="firstName" />
            </Col>
            <Col>
              <Form.Control placeholder="Last name" onChange={(e) => setRegisterSurname(e.target.value)} style={{ border: '1px solid grey' }} id="lastName" />
            </Col>

          </Row>
          <Row style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Group controlId="storeName" style={{ marginRight: "15px" }}>
              <Form.Control type="text" placeholder="Store Name" style={{ width: "332px", border: '1px solid grey' }} onChange={(e) => setStoreName(e.target.value)} />
            </Form.Group>
            <Nav style={{ fontSize: '16px', position: "absolute", right: '0px', bottom: '-40px', textDecoration: 'underline' }}>
              <Nav.Link href='/register'>
                Want to create an customer account?
              </Nav.Link>
            </Nav>
          </Row>

          <div>
            <Button variant="primary" type="submit" onClick={e => submit(e)} style={{ marginTop: "20px" }} id="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Store_Register
