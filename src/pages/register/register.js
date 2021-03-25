import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
    <Form style={{margin: "30px auto", width: "500px"}}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setRegisterUsername(e.target.value)} style={{width: "400px"}}/>
      </Form.Group>
      <div style={{position: "relative"}}>
        <span style={{color: "darkgrey", fontSize:"14px", position:"absolute", top:"-16px", left: "104px"}}>
          We'll never share your email with anyone else.
        </span>
      </div>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setRegisterPassword(e.target.value)} style={{width: "400px"}}/>
      </Form.Group>
      <Form.Group controlId="formBasicPassword2">
        <Form.Label>Password(*)</Form.Label>
        <Form.Control type="password" placeholder="Password" style={{width: "400px"}}/>
      </Form.Group>
      <Row style={{width: "430px", marginLeft: "auto", display:"flex", justifyContent:"space-between"}}>
        <Col>
          <Form.Control placeholder="First name" onChange={(e) => setRegisterName(e.target.value)} />
        </Col>
        <Col>
          <Form.Control placeholder="Last name" onChange={(e) => setRegisterSurname(e.target.value)} />
        </Col>
      </Row>
      <Button variant="primary" type="submit" onClick={submit} style={{marginTop:"20px"}}>
        Submit
      </Button>
    </Form>
  )
}

export default Register
