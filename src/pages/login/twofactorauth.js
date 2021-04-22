import React from 'react';
import Button from "react-bootstrap/Button";
import { useParams, useHistory } from 'react-router-dom';

import Axios from "axios";

const TwoFactorAuth = () => {
    const { token } = useParams();
    const history = useHistory();
    const PORT = process.env.PORT || 4000;

    var url = `http://localhost:${PORT}/2fa/verifySecret/${token}`
    const submit = async (e) => {
        e.preventDefault();
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

        <Button variant="primary" style={{ margin: "3em auto" }} type="submit" onClick={(e) => submit(e)}>
            Send
        </Button>

    )
}

export default TwoFactorAuth
