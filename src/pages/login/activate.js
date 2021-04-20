import React from 'react';
import Button from "react-bootstrap/Button";
import { useParams, useHistory } from 'react-router-dom';

import Axios from "axios";

const Activate = () => {
    const { token } = useParams();
    const history = useHistory();
    const PORT = process.env.PORT || 4000;

    var url = `http://localhost:${PORT}/activate/${token}`
    const submit = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-unused-vars
        const res = await Axios.post(url).catch(err => console.log(`Error in activate.js: ${err}`));
        history.push("/login");
    };


    return (

        <Button variant="primary" style={{ margin: "3em auto" }} type="submit" onClick={(e) => submit(e)}>
            Activate
        </Button>

    )
}

export default Activate
