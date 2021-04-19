import { Tab } from 'bootstrap';
import React, { useState, useRef } from 'react';
import { Card, Tabs } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams, useHistory } from 'react-router-dom';
import Axios from "axios";

const Profile = (props) => {
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  console.log(`In profile: `);
  const ref = useRef(true);

  const getProfile = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        sessionID: sessionID
      },
      withCredentials: true,
      url: `http://localhost:4000/profile/user`,
    });
    ref.current = false;
    console.log(res.data);
  };
  getProfile();

  const userInfo = {
    name: props.user.name,
    surname: props.user.surname,
    email: props.user.email,
    oldemail: props.user.email
  };

  const { token } = useParams();
  const [registerName, setRegisterName] = useState("");
  const [registerSurname, setRegisterSurname] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const history = useHistory();
  const PORT = process.env.PORT || 4000;

  var url = `http://localhost:${PORT}/profile/update`
  const submit = async (e) => {
    e.preventDefault();
    userInfo.name = registerName;
    userInfo.surname = registerSurname;
    userInfo.email = registerEmail;
    const res = await Axios.put(url, {
      user: userInfo
    }).catch(err => console.log(`Error in update.js: ${err}`));
    window.location.reload();
  };

  return (
    <div style={{ margin: '2rem', justifyContent: 'center' }}>
      {
        <Tabs>
          <Tab eventKey="account" title="Account"></Tab>
          <Tab eventKey="privacy" title="Privacy"></Tab>
          <Tab eventKey="orders" title="Orders"></Tab>

          <Tab.Content eventKey="account" style={{ margin: '2rem ' }}>
            <Card>
              <Card.Body>
                <Form style={{ margin: "2rem auto" }}>
                  <Form.Group controlId="formName">
                    <Form.Label style={{ paddingRight: "3rem" }}> Name: </Form.Label>
                    <Form.Control type="name" placeholder={userInfo.name} onChange={e => setRegisterName(e.target.value)} />
                    <Form.Control type="name" placeholder={userInfo.surname} onChange={e => setRegisterSurname(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label> E-Mail Address: </Form.Label>
                    <Form.Control type="email" placeholder={userInfo.email} onChange={e => setRegisterEmail(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={(e) => submit(e)} >
                    Update
            </Button>
                </Form>
              </Card.Body>
            </Card>
          </Tab.Content>

          <Tab.Content eventKey="privacy" style={{ margin: '2rem' }}>
            <Card>
              <Card.Body> </Card.Body>
            </Card>
          </Tab.Content>

          <Tab.Content eventKey="orders" style={{ margin: '2rem' }}>
            <Card>
              <Card.Body>
                <Card.Title>You have no orders yet. </Card.Title>
              </Card.Body>
            </Card>
          </Tab.Content>

        </Tabs>
      }
    </div>
  )
}

export default Profile
