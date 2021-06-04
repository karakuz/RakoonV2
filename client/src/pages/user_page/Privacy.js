import React from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import Axios from "axios";
import ProfileNav from './ProfileNav';
import '../css/profile.css';

const Privacy = () => {
  const [registerOldPassword, setRegisterOldPassword] = React.useState("");
  const [registerNewPassword, setRegisterNewPassword] = React.useState("");
  const [twofaenable, setTwofaenable] = React.useState("");

  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  const submit = async (e) => {
    e.preventDefault();
    if (registerOldPassword === "" && registerNewPassword === "") {
      // Only send two fa
      if (twofaenable === 1 || twofaenable === 0) {
        return;
      }

      const res = await Axios.put(`${url}/profile/2fa/update`, {
        twofaenable: twofaenable == "Off" ? 0 : 1,
        sessionID: sessionID
      }).catch(err => console.log(`Error 2fa.js: ${err}`));
      alert("2FA settings has been updated.")
      window.location.reload();


    }
    else if (registerOldPassword === "" && registerNewPassword !== "") {
      // ERROR
      alert("Please enter the old Password");
    }
    else if (registerOldPassword !== "" && registerNewPassword === "") {
      // ERROR

      alert("Please provide a new Password");
    }
    else {
      // verify old password and update all
      const verifyPassword = await Axios.post(`${url}/profile/passwordUpdate`, {
        sessionID: sessionID,
        oldPassword: registerOldPassword,
        newPassword: registerNewPassword
      });

      if (verifyPassword.data) {
        alert("Your password has been changed succesfully");
        if (twofaenable === 1 || twofaenable === 0)
          return;

        const res = await Axios.put(`${url}/profile/2fa/update`, {
          twofaenable: twofaenable === "Off" ? 0 : 1,
          sessionID: sessionID
        }).catch(err => console.log(`Error 2fa.js: ${err}`));
        window.location.reload();
      }
      else
        alert("Your old password is wrong");
    }
  }

  return (
    <div className="privacyDiv">
      <ProfileNav />
      <Card>
        <Card.Body className="privacyCard">
          <Form className="privacyForm" onSubmit={e => submit(e)}>
            <Form.Label>Two Factor Auth</Form.Label>
            <Form.Control as="select" defaultValue="Select" onChange={e => setTwofaenable(e.target.value)}>
              <option>Select</option>
              <option>On</option>
              <option>Off</option>
            </Form.Control>

            <Form.Group controlId="formBasicPassword" className="passwordForm">
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" onChange={e => setRegisterOldPassword(e.target.value)} />
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" onChange={e => setRegisterNewPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={e => submit(e)} style={{margin: "0 auto", display: "block"}}>
              Update
            </Button>
          </Form>

        </Card.Body>
      </Card>
    </div>
  )
}

export default Privacy
