import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { Col, Container } from 'react-bootstrap';

const checkout = () => {
  /* const [registerAddress, setRegisterAdress] = useState("");
   const [registerAddress2, setRegisterAdress2] = useState("");
   const [registerCity, setRegisterCity] = useState("");
   const [registerZipCode, setRegisterZipCode] = useState("");
   const [registerCountry, setRegisterCountry] = useState("");
   const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
 
   const PORT = process.env.PORT || 4000;
 
 
   const submit = async (e) => {
     e.preventDefault();
 
     document.querySelector('#submit').disabled = true;
     document.querySelectorAll('input').forEach( input => input.disabled = true );
 
     const res = await Axios({
       method: "POST",
       data: {
         adress: registerAddress,
         adress2: registerAddress2,
         city: registerCity,
         zipCode: registerZipCode,
         country: registerCountry,
         phoneNumber: registerPhoneNumber
       },
       credentials: 'include',
       withCredentials: true,
       url: `http://localhost:${PORT}/shippingAddress`,
     });
 
   };*/

  return (
    <div style={{ margin: '2rem' }}>
      <h4 class="mb-5" style={{ textAlign: 'center' }}>Checkout</h4>
      <Container style={{ display: 'block' }}>
        <div class="row" >
          <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">Your cart</span>
            </h4>
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0">Product name</h6>
                  <small class="text-muted">Brief description</small>
                </div>
                <span class="text-muted">$12</span>
              </li>
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0">Second product</h6>
                  <small class="text-muted">Brief description</small>
                </div>
                <span class="text-muted">$8</span>
              </li>
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0">Third item</h6>
                  <small class="text-muted">Brief description</small>
                </div>
                <span class="text-muted">$5</span>
              </li>
              <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span class="text-success">-$5</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>$20</strong>
              </li>
            </ul>
          </div>

          <div class="col-md-8 order-md-1">
            <Form style={{ width: 'auto' }} >
              <h4 class="mb-4">Billing Address</h4>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>First Name </Form.Label>
                  <Form.Control id="firstname" type="firstname" /*onChange={e => setRegisterCity(e.target.value)}*/ />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Surname </Form.Label>
                  <Form.Control id="surname" type="surname" /*onChange={e => setRegisterZipCode(e.target.value)}*/ />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label style={{ marginRight: '1rem' }}>Address </Form.Label>
                <Form.Control placeholder="1234 Main St" id="adress" type="adress" /*onChange={e => setRegisterAdress(e.target.value)}*/ />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label style={{ marginRight: '1rem' }}>Address 2 </Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" id="adress2" type="adress2" /*onChange={e => setRegisterAdress2(e.target.value)}*/ />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Country </Form.Label>
                  <Form.Control id="country" type="country" /*onChange={e => setRegisterZipCode(e.target.value)}*/ />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City </Form.Label>
                  <Form.Control id="city" type="city" /*onChange={e => setRegisterCity(e.target.value)}*/ />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip </Form.Label>
                  <Form.Control id="zipCode" type="zipCode" /*onChange={e => setRegisterZipCode(e.target.value)}*/ />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label >Phone Number </Form.Label>
                  <Form.Control id="phoneNumber" type="phoneNumber" /*onChange={e => setRegisterPhoneNumber(e.target.value)}*/ />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label >E-Mail Address </Form.Label>
                  <Form.Control id="email" type="email" /*onChange={e => setRegisterPhoneNumber(e.target.value)}*/ />
                </Form.Group>
              </Form.Row>
            </Form>

            <hr class="mb-4"></hr>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Shipping address is the same as my billing address" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Save this information for next time" />
            </Form.Group>
            <hr class="mb-4"></hr>

            <div class="d-block my-3">
              <Form style={{ width: 'auto' }} >
                <h4 class="mb-3">Payment</h4>
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Payment Info</Form.Label>
                  <Form.Control placeholder="Account Number" id="payment" type="payment" />
                </Form.Group>
              </Form>
              <hr class="mb-4"></hr>
            </div>
          </div>
        </div>
      </Container>
    </div>

  )
}

export default checkout

