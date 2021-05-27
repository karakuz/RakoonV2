import React, { useEffect, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import StoreNav from './StoreNav'
const jwt = require("jsonwebtoken");

const StoreNotification = () => {
    const [message, setMessage] = useState("");
    const [selected, setSelected] = useState("");
    const [selectedAll, setSelectedAll] = useState(0);
    const [checkItem, setCheckItem] = useState("");
    const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
    const user = jwt.verify(sessionID, 'shhhhh');
    var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
    const setNotification = async () => {
        console.log("In getSales");
        const res = await Axios({
            method: "POST",
            data: {
                message: message
            },
            withCredentials: true,
            url: `${url}/store/setNotification`,
        });

    }



    useEffect(() => {

    }, [])

    useEffect(() => {
        if (selected === "All users") {
            setSelectedAll(1);
        } else if (selected === "Specify") {
            setSelectedAll(2);
        }
    }, [selected])

    return (
        <div>
            <StoreNav user={user} />
            <Card>
                <Card.Body>
                    <Form style={{ margin: "2rem auto" }}>
                        <Form.Label>Choose users to notify</Form.Label>
                        <Form.Control as="select" defaultValue={selected} onChange={(e) => setSelected(e.target.value)}>
                            <option>Select</option>
                            <option>All users</option>
                            <option>Specify</option>
                        </Form.Control>
                        {
                            (selectedAll === 0) ? null :
                                (selectedAll === 1) ? <Button style={{ display: "flex", marginTop: "2rem" }}>Confirm</Button> :
                                    <>
                                        <div style={{ justifyContent: "center" }}>
                                            <ul class="list-group">
                                                <li class="list-group-item">
                                                    <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                        First checkbox
                    </li>
                                                <li class="list-group-item">
                                                    <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                        Second checkbox
                    </li>
                                                <li class="list-group-item">
                                                    <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                        Third checkbox
                    </li>
                                                <li class="list-group-item">
                                                    <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                        Fourth checkbox
                    </li>
                                                <li class="list-group-item">
                                                    <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." />
                        Fifth checkbox
                    </li>
                                            </ul>
                                        </div>
                                        <Button style={{ display: "flex", marginTop: "2rem" }}>Confirm</Button>
                                    </>
                        }
                    </Form>

                </Card.Body>
            </Card>
        </div>
    )
}

export default StoreNotification