/* eslint-disable react-hooks/exhaustive-deps */
import { Tab } from 'bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import { Card, Tabs } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import { useParams, useHistory } from 'react-router-dom';
import Axios from "axios";

const Profile = (props) => {
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');

  const ref = useRef(true);

  //const { token } = useParams();
  const [registerName, setRegisterName] = useState("");
  const [registerSurname, setRegisterSurname] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  //const history = useHistory();
  const PORT = process.env.PORT || 4000;

  var url = `http://localhost:${PORT}/profile/update`

  var userInfo = {
    name: "",
    surname: "",
    email: "",
    oldemail: ""
  };
  useEffect(() => {
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
      userInfo.name = res.data.name;
      userInfo.surname = res.data.surname;
      userInfo.email = res.data.e_mail;

    };
    getProfile().then(() => {
      console.log(userInfo);
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
    userInfo.name = registerName;
    userInfo.surname = registerSurname;
    userInfo.email = registerEmail;
    const res = await Axios.put(url, {
      user: userInfo,
      sessionID: sessionID
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
          </Tab.Content>

          <Tab.Content eventKey="privacy" style={{ margin: '2rem' }}>
            <Card>
              <Card.Body> 
              <Form style={{ margin: "2rem auto" }}>
                  {/* <ButtonGroup toggle>
                    2 Factor Authentication :
                  <ToggleButton
                      type="radio" variant="primary" name="radio" value="Enable" onChange={(e) => setRadioValue(e.currentTarget.value)}>
                      Enable
                  </ToggleButton>

                    <ToggleButton
                      type="radio" variant="secondary" name="radio" value="Disable" onChange={(e) => setRadioValue(e.currentTarget.value)}>
                      Disable
                  </ToggleButton>

                  </ButtonGroup> */}

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control type="password" />
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Change Password
                </Button>
                </Form>

              </Card.Body>
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
