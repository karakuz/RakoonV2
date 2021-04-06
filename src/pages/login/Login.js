import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import '../css/login.css'
import Axios from "axios"
import Nav from "react-bootstrap/Nav";

var jwt = require('jsonwebtoken');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();
  const PORT = process.env.PORT || 4000;

  const Submit = async (e) => {
    e.preventDefault();

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
      url: `http://localhost:${PORT}/login`,
    });
    console.log(JSON.stringify(user, null, '\t'));

    if (typeof user.data == typeof {}) {
      const token = jwt.sign(user.data, 'shhhhh');
      localStorage.setItem('sessionID', token);
      history.push('/');
    }
    else alert("Your E-mail or password is wrong");
  }

  const redirect = () => {
    history.push('/forgot');
  }
  return (
    <div>
      <div className="form_container" style={{width:'590px', margin:'2rem auto', fontSize:'2em'}}>
        <div style={{marginBottom: '1em', width: '100%', display: 'flex', justifyContent: 'center', borderBottom: '1px solid grey'}}>
          <Nav>
            <Nav.Link style={{borderRight: '1px solid grey'}} href="/login">LOGIN</Nav.Link>
            <Nav.Link eventKey={2} href="/register">SIGN UP</Nav.Link>
          </Nav>
        </div>
        <form onSubmit={Submit}>
          <div>
            <label>E-mail:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div style={{position:"relative"}}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <span style={{fontSize: '16px', position:'absolute', right:'0', bottom: '-30px', color:'red', cursor: 'pointer'}} onClick={()=>redirect()}>Forgot Password?</span>
          </div>
          <div>
            <button type="submit" className="btn" style={{border: '1px solid black', display: 'inline-block', marginTop: '25px', fontSize: '20px'}}>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login