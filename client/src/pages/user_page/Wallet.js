import React, { useEffect } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import Axios from "axios";
import ProfileNav from './ProfileNav';
import Loading from '../cart/loading.gif';
const jwt = require("jsonwebtoken");

const Wallet = () => {
  const [walletAddress, setWalletAddress] = React.useState("");
  const [walletBalance, setWalletBalance] = React.useState("");
  const [inputToken, setInputToken] = React.useState("");

  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  useEffect(() => {
    (async () => {
      const res = await Axios({
        method: "POST",
        data: {
          sessionID: sessionID
        },
        withCredentials: true,
        url: `${url}/payment/walletbalance`,
      });
      setWalletAddress(res.data.address);
      setWalletBalance(res.data.balance);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const token = inputToken;
    if (token > 50)
      alert("Max token you can get once is 50");

    document.getElementById('cont').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    // eslint-disable-next-line no-unused-vars
    const res = await Axios({
      method: "POST",
      data: {
        input: token,
        sessionID: sessionID,
      },
      credentials: 'include',
      withCredentials: true,
      url: `${url}/payment/transferFaucet`
    });
    document.getElementById('loading').style.display = 'none';
    alert(`${token}RKN is added to your account`);
    window.location.reload();
  };

  return (
    <div className="walletDiv">
      <ProfileNav />
      {
        (walletAddress === "") ?
          <div id="loading" style={{ display: "block" }}>
            <img src={Loading} alt='Loading...' style={{ display: 'block', margin: "0 auto" }} />
          </div>
          : (user.user_id === 1) ?
              <div id="loading" style={{ display: "none" }}>
                <img src={Loading} alt='Loading...' style={{ display: 'block', margin: "0 auto" }} />
              </div>
            : (user.role_id === 1) ?
            <>
              <div id="loading" style={{ display: "none" }}>
                <img src={Loading} alt='Loading...' style={{ display: 'block', margin: "0 auto" }} />
              </div>
              <div id="cont">
                <Card>
                  <Card.Body>
                    <Card.Title>Wallet address: {walletAddress}  </Card.Title>
                    <Card.Title>Balance: {walletBalance} RKN </Card.Title>
                    <Form style={{ margin: "3em auto", position: "relative" }}>
                      <Form.Group controlId="formBasicPassword" onChange={e => setInputToken(e.target.value)}>
                        <Form.Label>Send Me RKN</Form.Label>
                        <Form.Control type="number" max='10' />
                      </Form.Group>
                      <span style={{ fontSize: '16px', position: 'absolute', right: '0', color: 'red', display: 'none' }} className='InvalidCode'>Code is invalid</span>

                      <div style={{ display: "flex" }}>
                        <Button variant="primary" style={{ margin: "3em auto" }} type="submit" onClick={(e) => submit(e)} >
                          Send
                          </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </div>

            </>
            :
            <div id="cont">
              <Card>
                <Card.Body>
                  <Card.Title>Wallet address: {walletAddress}  </Card.Title>
                  <Card.Title>Balance: {walletBalance} RKN </Card.Title>
                </Card.Body>
              </Card>
            </div>
      }
    </div>
  )
}

export default Wallet
