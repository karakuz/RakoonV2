import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Axios from "axios";
import redX from '../css/redX.jpg';
import greenTick from '../css/greenTick.png';
import '../css/register.css';

const Register = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerSurname, setRegisterSurname] = useState("");
  const PORT = process.env.PORT || 4000;

  const history = useHistory();
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
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

    document.querySelector('#submit').disabled = true;
    document.querySelectorAll('input').forEach(input => input.disabled = true);

    const res = await Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
        name: registerName,
        surname: registerSurname
      },
      credentials: 'include',
      withCredentials: true,
      url: `${url}/register`,
    });


    if (res.data.res === "exists") {
      document.querySelector('#exists').style.display = 'flex';
      setTimeout(() => {
        document.querySelector('#exists').style.display = 'none';
      }, 3000);

      document.querySelector('#submit').disabled = false;
      document.querySelectorAll('input').forEach(input => input.disabled = false);
    }
    else if (res.data.success === true) {
      const keys = Object.keys(localStorage);
      if (keys.length !== 0) {
        keys.forEach(async productID => {
          await Axios({
            method: "POST",
            data: {
              item: productID,
              user: { user_id: res.data.user_id }
            },
            withCredentials: true,
            url: `${url}/cart/product/${productID}`
          }).then(res => console.log(res)).then(() => localStorage.clear());
        });
      }
      localStorage.clear();
      document.querySelector('#success').style.display = 'flex';
      setTimeout(() => {
        document.querySelector('#success').style.display = 'none';
        history.push('/login');
      }, 3000);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="form_container" style={{ fontSize: '2em', position: 'relative' }}>
        <div style={{ display: 'none', position: 'absolute', overflow: 'auto', width: '350px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='exists'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px' }}>
            <span style={{ fontSize: '20px' }}>User already exists</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'none', padding: '10px', position: 'absolute', overflow: 'auto', width: '350px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='success'>
          <img src={greenTick} alt="success" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px', marginLeft: '10px', lineHeight: '0.9' }}>
            <span style={{ fontSize: '20px' }}>An email has been sent to {registerUsername} for activation</span>
            <div className="progress-bar-success">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'none', position: 'absolute', overflow: 'auto', width: '350px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='doesNotMatch'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px' }}>
            <span style={{ fontSize: '20px' }}>Passwords does not match</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'none', position: 'absolute', overflow: 'auto', width: '350px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='min6Char'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px' }}>
            <span style={{ fontSize: '12px' }}>Password should be minimum 6 characters</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'none', position: 'absolute', overflow: 'auto', width: '350px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='nameError'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px' }}>
            <span style={{ fontSize: '13px' }}>Your name or surname can not be empty</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1em', width: '100%', borderBottom: '1px solid grey' }}>
          <Nav style={{ display: 'flex', width: '100%' }}>
            <Nav.Link style={{ borderRight: '1px solid grey', flex: '1', textAlign: 'center', background: 'rgb(225,225,225)' }} href="/login">LOGIN</Nav.Link>
            <Nav.Link eventKey={2} href="/register" style={{ flex: '1', textAlign: 'center' }}>SIGN UP</Nav.Link>
          </Nav>
        </div>
        <Form style={{ margin: "0 auto" }} className="form">
          <Form.Group controlId="formBasicEmail" style={{ position: "relative" }} className="emailDiv">
            <Form.Label className="emailLabel">Email:</Form.Label>
            <Form.Control type="email" placeholder="Enter email" className="email" onChange={(e) => setRegisterUsername(e.target.value)} style={{ width: "332px", border: '1px solid grey' }} />
            <span style={{  }} className="spanNote">
              We'll never share your email with anyone else.
            </span>
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="passwordDiv">
            <Form.Label className="passwordLabel">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" className="password" onChange={(e) => setRegisterPassword(e.target.value)} style={{ width: "332px", border: '1px solid grey' }} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword2" className="passwordDiv">
            <Form.Label className="passwordLabel">Password(*)</Form.Label>
            <Form.Control type="password" placeholder="Password" style={{ width: "332px", border: '1px solid grey' }} className="password"/>
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "space-between", position: 'relative' }} className="nameInputs">
            <Col>
              <Form.Control 
                placeholder="First name" 
                onChange={(e) => setRegisterName(e.target.value)} 
                style={{ border: '1px solid grey' }} id="firstName" 
              />
            </Col>
            <Col>
              <Form.Control 
              placeholder="Last name" 
              onChange={(e) => setRegisterSurname(e.target.value)} 
              style={{ border: '1px solid grey' }} 
              id="lastName" 
              />
            </Col>
            <Nav style={{ fontSize: '16px', position: "absolute", right: '0px', bottom: '-40px', textDecoration: 'underline' }}>
              <Nav.Link href='/store_register'>
                Want to open a store?
              </Nav.Link>
            </Nav>
          </div>
          <div>
            <Button variant="primary" type="submit" onClick={(e) => submit(e)} style={{ marginTop: "20px" }} id='submit'>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register
