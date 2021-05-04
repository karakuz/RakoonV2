import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import Axios from "axios";
import ProfileNav from './ProfileNav';

const Wallet = (props) => {
    const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
    const [walletAddress, setWalletAddress] = React.useState("");

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
            setWalletAddress(res.data.wallet_address);
            console.log(res.data);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ margin: '2rem', justifyContent: 'center' }}>
            <ProfileNav />
            <Card>
                <Card.Body>
                    <Card.Title>Wallet address: {walletAddress}  </Card.Title>


                </Card.Body>
            </Card>
        </div>
    )
}

export default Wallet
