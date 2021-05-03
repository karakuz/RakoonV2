import React from 'react'
import { Card, Tab } from 'react-bootstrap';

const Orders = () => {
  console.log("test");
  return (
    <Tab.Content eventKey="orders" style={{ margin: '2rem' }}>
      <Card>
        <Card.Body>
          <Card.Title>You have no orders yet. </Card.Title>
        </Card.Body>
      </Card>
    </Tab.Content>
  )
}

export default Orders
