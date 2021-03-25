import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import '../css/login.css'
import Axios from "axios"

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
    <div className="form_container" style={{width:'50%', margin:'2rem auto', fontSize:'2em'}}>
      <form onSubmit={Submit}>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div style={{position:"relative", height:'67px'}}>
          <span style={{fontSize: '16px', position:'absolute', right:'0', color:'red', cursor: 'pointer'}} onClick={()=>redirect()}>Forgot Password?</span>
          <button type="submit" className="btn" style={{border: '1px solid black', display: 'inline-block', marginTop: '20px'}}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login