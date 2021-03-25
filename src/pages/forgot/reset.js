import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams, useHistory } from 'react-router-dom';

import Axios from "axios";

const Reset = () => {
    const { token } = useParams();
    const [registerPassword, setRegisterPassword] = useState("");
    const history = useHistory();
    const PORT = process.env.PORT || 4000;

    var url = `http://localhost:${PORT}/reset/${token}`
    const submit = async(e) => {
      e.preventDefault();
      const res = await Axios.post(url, {
        password: registerPassword
      }).catch(err => console.log(`Error in reset.js: ${err}`));
      if(res.data){
        alert('Your password has been changed');
        history.push('/login');
      }
    };


  return (
    <Form style={{margin: "3em auto"}}>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={e => setRegisterPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={(e)=> submit(e)}>
        Submit
      </Button>
    </Form>
  )
}

export default Reset
