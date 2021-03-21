import React, { useState } from 'react'
import '../css/login.css'

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const Submit = (e) =>{
    e.preventDefault();
    (email && password)? console.log(email, password): console.log("Empty form input");
    setEmail('');
    setPassword('');
  }

  return (
    <div className="form_container">
      <form onSubmit={Submit}>
        <div>
          <label>E-mail:</label>
          <input 
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  )
}

export default Login
