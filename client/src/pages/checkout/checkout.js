import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { Button, Col, Container } from 'react-bootstrap';
import redX from '../css/redX.jpg';
import Loading from '../cart/loading.gif';
import '../css/checkout.css';

/* function numeral(number) {
  number = String(number);
  if (number.indexOf('.') !== -1)
    for (let i = number.indexOf('.') - 3; i > 0; i -= 3)
      number = number.substring(0, i) + ',' + number.substring(i);
  else
    for (let i = number.length - 3; i > 0; i -= 3)
      number = number.substring(0, i) + ',' + number.substring(i);
  number = number.split('.')[0] + '.' + number.split('.')[1].substring(0, 3);
  return number;
} */

const Checkout = (props) => {
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const [products, setProducts] = useState([]);
  const ref = useRef(true);
  const history = useHistory();
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
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

  }; */
  // TO DO
  const proceedPayment = async () => {
    document.getElementById('cont').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    const info = {
      address: registerAddress,
      city: registerCity,
      zip: registerZipCode,
      country: registerCountry,

    }
    const res = await Axios({
      method: "POST",
      data: {
        sessionID: sessionID,
        products: products,
        info: info
      },
      withCredentials: true,
      url: `${url}/payment/transfer`,
    });

    document.getElementById('loading').style.display = 'none';
    if (res.data === "Success") {
      alert("Payment is completed. An invoice has been sent to your email")
      history.push("/");
    }
    else if (res.data === "InsufficientBalance")
      alert("You dont have sufficient balance")
    else
      alert("An error happenned");
    document.getElementById('cont').style.display = 'block';

    console.log(res.data); // Success // InsufficientBalance // Error
  }

  const getProducts = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        sessionID: sessionID
      },
      withCredentials: true,
      url: `${url}/cart/products`,
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
    <div>
      <div id="loading" style={{ display: "none" }}>
        <img src={Loading} alt='Loading...' style={{ display: 'block', margin: "0 auto" }} />
      </div>
      <div id="cont">
        <Link className='btn btn-light my-3' to='/cart'>
          Go Back
        </Link>
        <div style={{ display: 'none', position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='addressError'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '3px' }}>
            <span style={{ fontSize: '17px' }}>Please fill out the neccesary </span>
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
        <Container>
          <div style={{ order: '2' }} className="proceed">
            <div class="">
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
                    <h6 class="my-0">Total: </h6>
                  </div>
                  <span>${products.reduce((a, v) => a = a + v.price, 0)}</span>
                </li>
                <div style={{ marginTop: '1rem' }}>
                  <Button onClick={() => proceedPayment()} className="proceedButton">Complete Payment</Button>
                </div>
              </ul>
            </div>
          </div>
          <div class="col-md-8 order-md-1 checkoutForm">
            <Form style={{ width: 'auto' }} >
              <h4 class="mb-4"> Address</h4>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>First Name <span class="text-muted">*</span></Form.Label>
                  <Form.Control id="firstname" type="firstname" onChange={e => setRegisterFirstname(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Surname <span class="text-muted">*</span></Form.Label>
                  <Form.Control id="surname" type="surname" onChange={e => setRegisterSurname(e.target.value)} />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label style={{ marginRight: '1rem' }}>Address <span class="text-muted">*</span></Form.Label>
                <Form.Control placeholder="1234 Main St" id="adress" type="adress" onChange={e => setRegisterAdress(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label style={{ marginRight: '1rem' }}>Address 2 <span class="text-muted">(Optional)</span></Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" id="adress2" type="adress2" onChange={e => setRegisterAdress2(e.target.value)} />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Country <span class="text-muted">*</span> </Form.Label>
                  <Form.Control id="country" type="country" onChange={e => setRegisterCountry(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City <span class="text-muted">*</span> </Form.Label>
                  <Form.Control id="city" type="city" onChange={e => setRegisterCity(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip <span class="text-muted">*</span></Form.Label>
                  <Form.Control id="zipCode" type="zipCode" onChange={e => setRegisterZipCode(e.target.value)} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label >Phone Number <span class="text-muted">*</span></Form.Label>
                  <Form.Control id="phoneNumber" type="phoneNumber" onChange={e => setRegisterPhoneNumber(e.target.value)} />
                </Form.Group>
              </Form.Row>
              <Form.Text className="text-muted">
                * must be filled out
              </Form.Text>
            </Form>

            <hr class="mb-4"></hr>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Save this information for next time" />
            </Form.Group>
            <hr class="mb-4"></hr>
          </div>
        </Container>
      </div>
    </div>
  )
}


export default Checkout
