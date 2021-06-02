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

    var sendNotification = function (data) {
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic Njc2NDY4MTMtOWVkZi00Mjg0LWE0YWUtZTI0ZDUyNDRiYjNk"
        };

        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };


        var req = https.request(options, function (res) {
            res.on('data', function (data) {
                console.log("Response:");
                console.log(JSON.parse(data));
            });
        });

        req.on('error', function (e) {
            console.log("ERROR:");
            console.log(e);
        });

        req.write(JSON.stringify(data));
        req.end();
    };

    var message2 = {
        app_id: "d02c9816-ba91-486b-9409-e4c26855cc7e",
        contents: { "en": message },
        included_segments: ["Subscribed Users"]
    };



    const setNotification = async (messageeee, e) => {
        e.preventDefault();
        sendNotification(message2);



        history.push('/store/notification');
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
                        <Button type="submit" onClick={(e) => setNotification(message, e)}>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default StoreNotification