import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import StoreNav from './StoreNav'
const jwt = require("jsonwebtoken");

const StoreNotification = () => {
    const [sales, setSales] = useState({});

    const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
    const user = jwt.verify(sessionID, 'shhhhh');
    var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
    const getSales = async () => {
        console.log("In getSales");
        const res = await Axios({
            method: "POST",
            data: {
                user_id: user.user_id
            },
            withCredentials: true,
            url: `${url}/store/getSales`,
        });
        setSales(res.data);
    }

    useEffect(() => {
        getSales();
    }, [])

    return (
        <>
            <StoreNav user={user} />
            <div>
                test
      </div>
        </>
    )
}

export default StoreNotification