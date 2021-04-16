import { Tab } from 'bootstrap';
import React from 'react';
import { Card, Tabs } from 'react-bootstrap';


const Profile = (props) => {
  console.log(`In profile: `);
  const userInfo = {
    name: props.user.name,
    surname: props.user.surname,
    email: props.user.email
  };

  return (
    <div style={{ margin: '2rem', justifyContent: 'center'}}>
      {      
    <Tabs>
    <Tab eventKey="account" title="Account">
    </Tab>
    <Tab eventKey="privacy" title="Privacy">
    </Tab>
    <Tab eventKey="orders" title="Orders">
    </Tab>

    <Tab.Content eventKey="account" style={{margin: '2rem'}}>
       <Card>
          <Card.Body>
            <Card.Title>Name: {userInfo.name} </Card.Title>
            <Card.Title>Surname: {userInfo.surname}</Card.Title>
            <Card.Title>E-Mail Address: {userInfo.email}</Card.Title>
          </Card.Body>
        </Card>
    </Tab.Content>

    <Tab.Content eventKey="privacy" style={{margin: '2rem'}}>
       <Card>
          <Card.Body> 
            </Card.Body>
        </Card>
    </Tab.Content>

    <Tab.Content eventKey="orders" style={{margin: '2rem'}}>
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
