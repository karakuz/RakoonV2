import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from 'react-router-dom';

import Axios from "axios";

const Reset = () => {
    const { token } = useParams();
    console.log(token);
    /* const [registerPassword, setRegisterPassword] = useState("");


    const submit = () => {
        Axios({
            method: "POST",
            data: {
                password: registerPassword,
            },
            withCredentials: true,
            url: "http://localhost:4000/reset:token",
        }).then((res) => console.log(res));
    }; */

    return (
        <Form>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => {}} />
            </Form.Group>


            <Button variant="primary" type="submit" onClick={()=>{}}>
                Submit
        </Button>
        </Form>
    )
}

export default Reset
