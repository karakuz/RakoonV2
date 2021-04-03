import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
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
        const res = await Axios.post().catch(err => console.log(`Error in activate.js: ${err}`));
    };


    return (

        <Button variant="primary" type="submit" onClick={(e) => submit(e)}>
            Activate
        </Button>

    )
}

export default Activate
