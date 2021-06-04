import React, { useEffect, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import StoreNav from './StoreNav'
const jwt = require("jsonwebtoken");
var https = require('https');

const StoreNotification = () => {
    const [message, setMessage] = useState("");
    const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
    const user = jwt.verify(sessionID, 'shhhhh');
    let history = useHistory();
    var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";

    const setNotification = async (message, e) => {
        e.preventDefault();
        const res = await Axios({
            method: "POST",
            data: {
                message: message,
            },
            withCredentials: true,
            url: `${url}/store/sendNotification`
        });

        window.location.reload();
        history.push('/store/notification');

    }

    useEffect(() => {

    }, [])


    return (
        <div>
            <StoreNav user={user} />
            <Card>
                <Card.Body>
                    <Form style={{ margin: "0 auto", width: "300px", display: "block"}}>
                        <Form.Label style={{ textAlign: "center"}}>Enter your notification here</Form.Label>
                        <Form.Control onChange={(e) => setMessage(e.target.value)}>
                        </Form.Control>
                        <Button type="submit" onClick={(e) => setNotification(message, e)} style={{ margin: "0 auto", display: "block", marginTop: "1rem"}}>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default StoreNotification