import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { Button, Col, Container } from 'react-bootstrap';
import redX from '../css/redX.jpg';


function numeral(number) {
  number = String(number);
  if (number.indexOf('.') !== -1)
    for (let i = number.indexOf('.') - 3; i > 0; i -= 3)
      number = number.substring(0, i) + ',' + number.substring(i);
  else
    for (let i = number.length - 3; i > 0; i -= 3)
      number = number.substring(0, i) + ',' + number.substring(i);
  number = number.split('.')[0] + '.' + number.split('.')[1].substring(0, 3);
  return number;
}

const Checkout = (props) => {
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const [products, setProducts] = useState([]);
  const ref = useRef(true);

  const [registerAddress, setRegisterAdress] = useState("");
  const [registerAddress2, setRegisterAdress2] = useState("");
  const [registerCity, setRegisterCity] = useState("");
  const [registerZipCode, setRegisterZipCode] = useState("");
  const [registerCountry, setRegisterCountry] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerFirstname, setRegisterFirstname] = useState("");
  const [registerSurname, setRegisterSurname] = useState("");
  /*const submit = async (e) => {
    e.preventDefault();
  
    if(document.querySelector('#formBasicPassword').value !== document.querySelector('#formBasicPassword2').value){
      document.querySelector('#doesNotMatch').style.display = 'flex';
      setTimeout(()=>{
        document.querySelector('#doesNotMatch').style.display = 'none';
      },3000);
      return;
    }
    else if(document.querySelector('#formBasicPassword').value.length < 6){
      document.querySelector('#min6Char').style.display = 'flex';
      setTimeout(()=>{
        document.querySelector('#min6Char').style.display = 'none';
      },3000);
      return;
    }
    else if(document.querySelector('#firstName').value.length < 3 || document.querySelector('#lastName').value.length < 3){
      document.querySelector('#nameError').style.display = 'flex';
      setTimeout(()=>{
        document.querySelector('#nameError').style.display = 'none';
      },3000);
      return;
    }
  
    document.querySelector('#submit').disabled = true;
    document.querySelectorAll('input').forEach( input => input.disabled = true );
  
    const res = await Axios({
      method: "POST",
      data: {
        address: registerAddress,
        address2: registerAddress2,
        city: registerCity,
        zipcode: registerZipCode,
        phonenumber: registerPhoneNumber,
        email: registerEmail,
        firstname: registerFirstname,
        surnmae: registerSurname

      },
      credentials: 'include',
      withCredentials: true,
      url: `http://localhost:${PORT}/register`,
    });
  
 
    if(res.data.res==="exists"){
      document.querySelector('#exists').style.display = 'flex';
      setTimeout(()=>{
        document.querySelector('#exists').style.display = 'none';
      },3000);
  
      document.querySelector('#submit').disabled = false;
      document.querySelectorAll('input').forEach( input => input.disabled = false );
    }
    else if(res.data.success===true){
      const keys = Object.keys(localStorage);
      if(keys.length!==0){
        keys.forEach(async productID =>{
          await Axios({
            method: "POST",
            data: {
              item: productID,
              user: {user_id: res.data.user_id}
            },
            withCredentials: true,
            url: `http://localhost:4000/cart/product/${productID}`
          }).then(res => console.log(res)).then(()=> localStorage.clear());
        });
      }
      document.querySelector('#success').style.display = 'flex';
      setTimeout(()=>{
        document.querySelector('#success').style.display = 'none';
        history.push('/login');
      },3000);
    }
  }; */


  const getProducts = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        sessionID: sessionID
      },
      withCredentials: true,
      url: `http://localhost:4000/cart/products`,
    });
    setProducts(res.data);
    ref.current = false;
  };

  useEffect(() => {
    if (Object.keys(localStorage).includes('sessionID')) getProducts();
    else {
      var arr = []
      Object.keys(localStorage).forEach(productID => {
        arr.push(JSON.parse(localStorage.getItem(productID)));
      });
      setProducts(arr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ margin: '2rem' }}>

      <div style={{ display: 'none', position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='addressError'>
        <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
        <div style={{ flexGrow: '1', marginTop: '3px' }}>
          <span style={{ fontSize: '17px' }}>Adress cannot be empty!</span>
          <div className="progress-bar-error">
            <span className="progress-bar-inner"></span>
          </div>
        </div>
      </div>

      <div style={{ display: 'none', position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='paymentError'>
        <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
        <div style={{ flexGrow: '1', marginTop: '3px' }}>
          <span style={{ fontSize: '17px' }}>Please insert payment info!</span>
          <div className="progress-bar-error">
            <span className="progress-bar-inner"></span>
          </div>
        </div>
      </div>

      <h4 class="mb-5" style={{ textAlign: 'center' }}>Checkout</h4>
      <Container style={{ display: 'block' }}>
        <div class="row" >
          <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">Your cart</span>
            </h4>
            <ul class="list-group mb-3">
              {
                products.map((product) => {
                  return (
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 class="my-0">{product.item_name}</h6>
                      </div>
                      <span class="text-muted">${product.price}</span>
                    </li>
                  );
                })
              }
              <li class="list-group-item d-flex justify-content-between" >
                <div>
                  <h6 class="my-0">Total:</h6>
                </div>
              
              </li>
              <div style={{ marginTop: '1rem' }} > <Button>Proceed to Payment</Button></div>
            </ul>
          </div>

          <div class="col-md-8 order-md-1">
            <Form style={{ width: 'auto' }} >
              <h4 class="mb-4">Billing Address</h4>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>First Name <span class="text-muted">*</span></Form.Label>
                  <Form.Control id="firstname" type="firstname" /*onChange={e => setRegisterFirstname(e.target.value)}*/ />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Surname <span class="text-muted">*</span></Form.Label>
                  <Form.Control id="surname" type="surname" /*onChange={e => setRegisterSurname(e.target.value)}*/ />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label style={{ marginRight: '1rem' }}>Address <span class="text-muted">*</span></Form.Label>
                <Form.Control placeholder="1234 Main St" id="adress" type="adress" /*onChange={e => setRegisterAdress(e.target.value)}*/ />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label style={{ marginRight: '1rem' }}>Address 2 <span class="text-muted">(Optional)</span></Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" id="adress2" type="adress2" /*onChange={e => setRegisterAdress2(e.target.value)}*/ />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Country <span class="text-muted">*</span> </Form.Label>
                  <Form.Control id="country" type="country" /*onChange={e => setRegisterCountry(e.target.value)}*/ />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City <span class="text-muted">*</span> </Form.Label>
                  <Form.Control id="city" type="city" /*onChange={e => setRegisterCity(e.target.value)}*/ />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip <span class="text-muted">*</span></Form.Label>
                  <Form.Control id="zipCode" type="zipCode" /*onChange={e => setRegisterZipCode(e.target.value)}*/ />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label >Phone Number <span class="text-muted">*</span></Form.Label>
                  <Form.Control id="phoneNumber" type="phoneNumber" /*onChange={e => setRegisterPhoneNumber(e.target.value)}*/ />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label >E-Mail Address <span class="text-muted">(Optional)</span> </Form.Label>
                  <Form.Control id="email" type="email" /*onChange={e => setRegisterEmail(e.target.value)}*/ />
                </Form.Group>
              </Form.Row>
              <Form.Text className="text-muted">
               * must be filled out
              </Form.Text>
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
            </div>
          </div>
        </div>
      </Container>
    </div>

  )
}


export default Checkout

