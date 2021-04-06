import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Axios from "axios";

const Register = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerSurname, setRegisterSurname] = useState("");
  const PORT = process.env.PORT || 4000;

  const submit = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
        name: registerName,
        surname: registerSurname,
      },
      withCredentials: true,
      url: `http://localhost:${PORT}/register`,
    }).then((res) => console.log(res));
  };

  return (
    <div>
      <div className="form_container" style={{width:'590px', margin:'2rem auto', fontSize:'2em'}}>
        <div style={{marginBottom: '1em', width: '100%', display: 'flex', justifyContent: 'center', borderBottom: '1px solid grey'}}>
            <Nav>
              <Nav.Link style={{borderRight: '1px solid grey'}} href="/login">LOGIN</Nav.Link>
              <Nav.Link eventKey={2} href="/register">SIGN UP</Nav.Link>
            </Nav>
          </div>
        <Form style={{margin: "0 auto", width: "500px"}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setRegisterUsername(e.target.value)} style={{width: "332px", border: '1px solid grey'}}/>
          </Form.Group>
          <div style={{position: "relative"}}>
            <span style={{color: "darkgrey", fontSize:"14px", position:"absolute", top:"-30px", right: "0"}}>
              We'll never share your email with anyone else.
            </span>
          </div>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setRegisterPassword(e.target.value)} style={{width: "332px", border: '1px solid grey'}}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword2">
            <Form.Label>Password(*)</Form.Label>
            <Form.Control type="password" placeholder="Password" style={{width: "332px", border: '1px solid grey'}}/>
          </Form.Group>
          <Row style={{width: "430px", marginLeft: "auto", display:"flex", justifyContent:"space-between"}}>
            <Col>
              <Form.Control placeholder="First name" onChange={(e) => setRegisterName(e.target.value)} style={{border: '1px solid grey'}}/>
            </Col>
            <Col>
              <Form.Control placeholder="Last name" onChange={(e) => setRegisterSurname(e.target.value)} style={{border: '1px solid grey'}}/>
            </Col>
          </Row>
          <div>
            <Button variant="primary" type="submit" onClick={submit} style={{marginTop:"20px"}}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register
