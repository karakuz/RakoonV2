import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router-dom';
import Axios from "axios";

const Forgot = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const history = useHistory();
  const PORT = process.env.PORT || 4000;

  const submit = async (e) => {
    e.preventDefault();
    if (registerUsername === '') {
      alert('Enter your email!');
      return;
    }
    const res = await Axios({
      method: "POST",
      data: {
        email: registerUsername,
      },
      withCredentials: true,
      url: `http://3.67.85.199:4000/forgot`,
    }).catch((err) => console.log(`err: ${err}`));

    if (res !== undefined && res.data === "sent") {
      alert(`Email is sent to ${registerUsername}`);
      history.push('/');
    }
    if (res === undefined || res.data === "NoUser") {
      alert("There is no user with that email");
      setRegisterUsername('');
      return;
    }
  };

  return (
    <div style={{ fontSize: '25px' }}>
      <Form style={{ margin: '0 auto' }}>
        <Form controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setRegisterUsername(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form>
        <Button variant="primary" type="submit" onClick={(e) => submit(e)}>
          Reset
      </Button>
      </Form>
    </div>
  )
}

export default Forgot
