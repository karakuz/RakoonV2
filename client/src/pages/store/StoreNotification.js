import React, { useEffect, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import StoreNav from './StoreNav'
const jwt = require("jsonwebtoken");

const StoreNotification = () => {
    const [message, setMessage] = useState("");
    const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
    const user = jwt.verify(sessionID, 'shhhhh');
    var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
    const setNotification = async () => {
        console.log(message);
        const res = await Axios({
            method: "POST",
            data: {
                message: message
            },
            withCredentials: true,
            url: `${url}/store/setNotification`,
        });
        window.location.reload();
    }

    useEffect(() => {
        
    }, [])


    return (
        <div>
            <StoreNav user={user} />
            <Card>
                <Card.Body>
                    <Form style={{ margin: "2rem auto" }}>
                        <Form.Label>Enter your notification here</Form.Label>
                        <Form.Control onChange={(e) => setMessage(e.target.value)}>
                        </Form.Control>
                        <Button onClick={(e) => setNotification(message)}>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default StoreNotification