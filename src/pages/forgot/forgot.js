import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Axios from "axios";

const Forgot = () => {

    const [registerUsername, setRegisterUsername] = useState("");


    const submit = () => {
        Axios({
            method: "POST",
            data: {
                email: registerUsername,
            },
            withCredentials: true,
            url: "http://localhost:4000/forgot",
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


            <Button variant="primary" type="submit" onClick={submit}>
                Reset
        </Button>
        </Form>
    )
}

export default Forgot
