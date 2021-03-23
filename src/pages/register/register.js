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
            url: "http://localhost:4000/register",
        }).then((res) => console.log(res));
    };

    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setRegisterUsername(e.target.value)} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
          </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setRegisterPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword2">
                <Form.Label>Password Again</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Control placeholder="First name" onChange={(e) => setRegisterName(e.target.value)} />
                </Col>
                <Col>
                    <Form.Control placeholder="Last name" onChange={(e) => setRegisterSurname(e.target.value)} />
                </Col>
            </Row>
            <Button variant="primary" type="submit" onClick={submit}>
                Submit
        </Button>
        </Form>
    )
}

export default Register
