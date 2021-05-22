import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Nav, Row, Col } from "react-bootstrap";
import Axios from "axios";
import redX from '../css/redX.jpg';
import greenTick from '../css/greenTick.png';
import StoreNav from './StoreNav';
const jwt = require("jsonwebtoken");

const StoreAddSalesManager = () => {
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [registerName, setRegisterName] = React.useState("");
  const [registerSurname, setRegisterSurname] = React.useState("");
  const PORT = process.env.PORT || 4000;
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');

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

    document.querySelector('#submit').disabled = true;
    document.querySelectorAll('input').forEach(input => input.disabled = true);

    const User = {
      email: registerEmail,
      name: registerName,
      lastname: registerSurname,
      password: registerPassword,
      owner_id: user.user_id
    };
    console.log(User);

    const res = await Axios({
      method: "POST",
      data: {
        user: User
      },
      credentials: 'include',
      withCredentials: true,
      url: `/addSalesManager`,
    });

    if (res.data.res === "exists") {
      document.querySelector('#exists').style.display = 'flex';
      setTimeout(() => {
        document.querySelector('#exists').style.display = 'none';
      }, 3000);

      document.querySelector('#submit').disabled = false;
      document.querySelectorAll('input').forEach(input => input.disabled = false);
    }
    else if (res.data === true) {
      document.querySelector('#success').style.display = 'flex';
      setTimeout(() => {
        document.querySelector('#success').style.display = 'none';
        history.push('/store');
      }, 3000);
    }
  }

  return (
    <div style={{ margin: '2rem' }}>
      <StoreNav user={user} />
      <div style={{ width: '590px', margin: '3rem auto', fontSize: '2em', position: 'relative' }}>
        <div style={{ display: 'none', position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', right: "70px", borderRadius: '10px' }} id='exists'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px' }}>
            <span style={{ fontSize: '20px' }}>User already exists</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'none', padding: '10px', position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', right: "70px", borderRadius: '10px' }} id='success'>
          <img src={greenTick} alt="success" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px', marginLeft: '10px', lineHeight: '0.9' }}>
            <span style={{ fontSize: '20px' }}>An email has been sent to {registerEmail} for activation</span>
            <div className="progress-bar-success">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'none', position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', right: "70px", borderRadius: '10px' }} id='doesNotMatch'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px' }}>
            <span style={{ fontSize: '20px' }}>Passwords does not match</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <Form style={{ margin: "0 auto", width: "500px" }}>
          <Form.Group controlId="formBasicEmail" style={{ position: "relative" }}>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setRegisterEmail(e.target.value)} style={{ width: "332px", border: '1px solid grey' }} />
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
          <div>
            <Button variant="primary" type="submit" onClick={(e) => submit(e)} style={{ marginTop: "20px" }} id='submit'>
              Create
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default StoreAddSalesManager
