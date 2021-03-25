import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import '../css/login.css'
import Axios from "axios"

var jwt = require('jsonwebtoken');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

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
      url: "http://localhost:4000/login",
    });
<<<<<<< HEAD
    if (data.status === 200) history.push('/');
=======
    if(user.status===200){
      const token = jwt.sign(user.data, 'shhhhh');
      localStorage.setItem('sessionID', token);
      history.push('/');
    } 
>>>>>>> 00ba8e040d5c104ace26020539cd105c85517a76
  }

  return (
    <div className="form_container">
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
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  )
}

export default Login