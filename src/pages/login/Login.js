import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import '../css/login.css'
import Axios from "axios"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const Submit = async (e) => {
    e.preventDefault();
    (email && password) ? console.log(email, password) : console.log("Empty form input");

    setEmail('');
    setPassword('');
    const user = await Axios({
      method: "POST",
      data: {
        username: email,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    });
    if(user.status===200) history.push('/',{ user: user.data });
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