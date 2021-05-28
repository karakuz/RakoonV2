import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import '../css/login.css'
import Axios from "axios"


var jwt = require('jsonwebtoken');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();
  const PORT = process.env.PORT || 4000;
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  const Submit = async (e) => {
    e.preventDefault();
    const rememberMe = document.querySelector('#rememberMe').checked;
    setEmail('');
    setPassword('');
    const user = await Axios({
      method: "POST",
      data: {
        username: email,
        password: password,
      },
      credentials: 'include',
      withCredentials: true,
      url: `${url}/login`,
    });
    if (user.data === "notVerified") {
      document.querySelector('.notverified').style.display = 'block';
    }

    else if (typeof user.data == typeof {}) {
      const token = jwt.sign(user.data, 'shhhhh');
      if (!rememberMe) localStorage.setItem('sessionID', token);
      else sessionStorage.setItem('sessionID', token);
      history.push('/');
    }

    else if (user.data === "twofa") {
      const req = await Axios({
        method: "POST",
        data: {
          email: email,
        },
        credentials: 'include',
        withCredentials: true,
        url: `${url}/2fa/generateSecret`,
      });
      history.push(`/two-factor-auth/${req.data.user_id}`);
    }

    else if (user.data === "UserNotExist") {
      document.querySelector('.WrongPassword').style.display = 'none';
      document.querySelector('.error').style.display = 'block';
    }

    else if (user.data === "WrongPassword") {
      document.querySelector('.error').style.display = 'none';
      document.querySelector('.WrongPassword').style.display = 'block';
    }
  }

  const redirect = () => {
    history.push('/forgot');
    //window.location.reload();
  }
  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="form_container" style={{ fontSize: '2em' }}>
        <div style={{ marginBottom: '1em', width: '100%', borderBottom: '1px solid grey' }}>
          <Nav style={{ display: 'flex', width: '100%' }}>
            <Nav.Link style={{ borderRight: '1px solid grey', flex: '1', textAlign: 'center' }} href="/login">LOGIN</Nav.Link>
            <Nav.Link eventKey={2} href="/register" style={{ flex: '1', textAlign: 'center', background: 'rgb(225,225,225)' }}>SIGN UP</Nav.Link>
          </Nav>
        </div>
        <form onSubmit={Submit}>
          <div className="emailDiv">
            <label style={{ marginBottom: "0"}} className="emailLabel">E-mail:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="email"
              style={{fontSize: "25px", width: "fit-content"}}
            />
          </div>
          <div style={{ position: "relative" }} className="passwordDiv">
            <label style={{ marginBottom: "0"}} className="passwordLabel">Password:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="password"
              style={{fontSize: "25px", width: "fit-content"}}
            />
            <span style={{ fontSize: '16px', position: 'absolute', right: '0', bottom: '-25px', color: 'red', display: 'none' }} className='error'>Email or Password is wrong!</span>
            <span style={{ fontSize: '16px', position: 'absolute', right: '0', bottom: '-25px', color: 'red', display: 'none' }} className='notverified'>User is not verified</span>
            <span style={{ fontSize: '16px', position: 'absolute', right: '0', bottom: '-25px', color: 'red', display: 'none' }} className='WrongPassword'>Your password is wrong</span>
            <span style={{ fontSize: '16px', position: 'absolute', right: '0', bottom: '-55px', color: 'red', cursor: 'pointer' }} onClick={() => redirect()}>Forgot Password?</span>
          </div>
          <div>
            <div style={{ margin: '2rem auto 0' }}>
              <label for="rememberMe" style={{ fontSize: '17px', marginRight: '8px' }}>Remember Me</label>
              <input type="checkbox" id="rememberMe" name="rememberMe" style={{ transform: 'scale(1.3)' }} />
            </div>
          </div>
          <div>
            <button type="submit" className="btn" style={{ border: '1px solid black', display: 'inline-block', marginTop: '10px', fontSize: '20px' }}>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login