import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from 'react-router-dom';

import Axios from "axios";

const Reset = () => {
    const { token } = useParams();
    console.log(token);
    const [registerPassword, setRegisterPassword] = useState("");

    var url = `http://localhost:4000/reset/${token}`
    const submit = () => {
        Axios.post(url, {
            password: registerPassword
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    };

    console.log(url);

    return (
        <Form>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setRegisterPassword(e.target.value)} />
            </Form.Group>


            <Button variant="primary" type="submit" onClick={submit}>
                Submit
        </Button>
        </Form>
    )
}

export default Reset
