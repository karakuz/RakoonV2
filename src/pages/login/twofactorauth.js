import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import { useParams, useHistory } from 'react-router-dom';

import Axios from "axios";
import { Form } from 'react-bootstrap';

const TwoFactorAuth = () => {
    const { token } = useParams();
    const history = useHistory();
    const [registerCode, setRegisterCode] = useState("");
    const PORT = process.env.PORT || 4000;

    var url = `http://localhost:${PORT}/2fa/verifySecret/${token}`
    const submit = async (e) => {
        e.preventDefault();
        const input = registerCode;
        // eslint-disable-next-line no-unused-vars
        const res = await Axios({
            method: "POST",
            data: {
                input: input,
                id: token,
            },
            credentials: 'include',
            withCredentials: true,
            url: url
        })
        history.push("/login");
    };


    return (
        <Form style={{ margin: "3em auto" }}>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setRegisterCode(e.target.value)} />
            </Form.Group>
            <Button variant="primary" style={{ margin: "3em auto" }} type="submit" onClick={(e) => submit(e)}>
                Send
        </Button>
        </Form>
    )
}

export default TwoFactorAuth
