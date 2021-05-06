import React, { useEffect } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import Axios from "axios";
import ProfileNav from './ProfileNav';
import Loading from '../cart/loading.gif';

const Wallet = (props) => {
    const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
    const [walletAddress, setWalletAddress] = React.useState("");
    const [walletBalance, setWalletBalance] = React.useState("");
    const [inputToken, setInputToken] = React.useState("");
    useEffect(() => {
        (async () => {
            const res = await Axios({
                method: "POST",
                data: {
                    sessionID: sessionID
                },
                withCredentials: true,
                url: `http://localhost:4000/payment/walletbalance`,
            });
            setWalletAddress(res.data.address);
            setWalletBalance(res.data.balance);
            console.log(res.data);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        document.getElementById('cont').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
        
        const token = inputToken;
        if (token > 10) {
            alert("Yavaş lan kaç tane alıyon");
            return;
        }
        // eslint-disable-next-line no-unused-vars
        const res = await Axios({
            method: "POST",
            data: {
                input: token,
                sessionID: sessionID,
            },
            credentials: 'include',
            withCredentials: true,
            url: `http://localhost:4000/payment/transferFaucet`
        });
        alert(`${token}RKN is added to your account`);
        window.location.reload();
    };

    return (
      <div style={{ margin: '2rem', justifyContent: 'center' }}>
        <div id="loading" style={{display: "none"}}>
          <img src={Loading} alt='Loading...' style={{display: 'block', margin: "0 auto"}}/>
        </div>
        <div id="cont">
          <ProfileNav />
          <Card>
            <Card.Body>
              <Card.Title>Wallet address: {walletAddress}  </Card.Title>
              <Card.Title>Balance: {walletBalance} RKN </Card.Title>
              <Form style={{ margin: "3em auto", position: "relative" }}>
                <Form.Group controlId="formBasicPassword" onChange={e => setInputToken(e.target.value)}>
                  <Form.Label>Send Me RKN</Form.Label>
                  <Form.Control type="number" />
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
        
      </div>
    )
}

export default Wallet
