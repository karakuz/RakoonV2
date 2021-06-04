import React, { useEffect } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import Axios from "axios";
import '../css/profile.css';
const jwt = require("jsonwebtoken");

const Account = (props) => {
  const [registerName, setRegisterName] = React.useState("");
  const [registerSurname, setRegisterSurname] = React.useState("");
  const [registerEmail, setRegisterEmail] = React.useState("");
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
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
        url: `${url}/profile/user`,
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
    const res = await Axios.put(`${url}/profile/update`, {
      user: userInfo,
      sessionID: props.sessionID
    }).catch(err => console.log(`Error in update.js: ${err}`));
    const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
    const old_user = jwt.verify(sessionID, 'shhhhh');
    old_user.name = registerName;
    const token = jwt.sign(old_user, 'shhhhh');
    localStorage.setItem('sessionID',token);
    
    alert("Your information has been updated.")
    window.location.reload();
  }

  return (
    <div>
      <Card>
        <Card.Body className="privacyCard">
          <Form className="accountForm">
            <Form.Row style={{ flexDirection: "column"}}>
              <Form.Group controlId="formName">
                <Form.Label>First Name</Form.Label>
                <Form.Control id="name" type="name" onChange={e => setRegisterName(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Surname</Form.Label>
                <Form.Control id="surname" type="surname" onChange={e => setRegisterSurname(e.target.value)} />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formEmail" className="profileEmail">
              <Form.Label> E-Mail Address: </Form.Label>
              <Form.Control id="email" type="email" onChange={e => setRegisterEmail(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => submit(e)} style={{margin: "0 auto", display: "block"}}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Account
