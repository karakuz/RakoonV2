import React, { useEffect } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import Axios from "axios";

const Account = (props) => {
  const [registerName, setRegisterName] = React.useState("");
  const [registerSurname, setRegisterSurname] = React.useState("");
  const [registerEmail, setRegisterEmail] = React.useState("");

  const userInfo = {
    name: "",
    surname: "",
    email: "",
    oldemail: "",
    twofa: false
  };

  useEffect(() => {
    const getProfile = async () => {
      const res = await Axios({
        method: "POST",
        data: {
          sessionID: props.sessionID
        },
        withCredentials: true,
        url: `http://localhost:4000/profile/user`,
      });
      userInfo.name = res.data.name;
      userInfo.surname = res.data.surname;
      userInfo.email = res.data.e_mail;
    };
    getProfile().then(() => {
      document.getElementById("name").value = userInfo.name;
      document.getElementById("surname").value = userInfo.surname;
      document.getElementById("email").value = userInfo.email;
      setRegisterName(userInfo.name);
      setRegisterSurname(userInfo.surname);
      setRegisterEmail(userInfo.email);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();

     e.preventDefault();
    userInfo.name = registerName;
    userInfo.surname = registerSurname;
    userInfo.email = registerEmail;
    const res = await Axios.put('http://localhost:4000/profile/update', {
      user: userInfo,
      sessionID: props.sessionID
    }).catch(err => console.log(`Error in update.js: ${err}`));
    window.location.reload();
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Form style={{ margin: "2rem auto" }}>
            <Form.Group controlId="formName">
              <Form.Label style={{ paddingRight: "3rem" }}> Name: </Form.Label>
              <Form.Control id="name" type="name" onChange={e => setRegisterName(e.target.value)} />
              <Form.Control id="surname" type="surname" onChange={e => setRegisterSurname(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label> E-Mail Address: </Form.Label>
              <Form.Control id="email" type="email" onChange={e => setRegisterEmail(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => submit(e)} >
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Account
