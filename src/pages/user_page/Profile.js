import React from 'react';
import { Card } from 'react-bootstrap';

const Profile = (props) => {
  console.log(`In profile: `);
  var nameSurname= JSON.stringify(props.user.name,null,2)+JSON.stringify(props.user.surname,null,2);
  var eMail = JSON.stringify(props.user.username);
  return (
    <div style={{ display: 'flex',justifyContent: 'center'}}>
      {      
       <Card style={{ margin: '5rem', width: '18rem' }}>
       <Card.Body>
         <Card.Title style={{textTransform: 'capitalize'}}>{nameSurname}</Card.Title>
         <Card.Subtitle className="mb-2 text-muted">{eMail}</Card.Subtitle>
         <Card.Text>
           User information
         </Card.Text>
         <Card.Link href="#">Purchases</Card.Link>
         <Card.Link href="#">Payment Information</Card.Link>
       </Card.Body>
     </Card>
      }
    </div>
  )
}

export default Profile
