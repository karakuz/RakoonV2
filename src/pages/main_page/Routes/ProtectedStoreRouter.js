import React from 'react'
import {Route, Redirect} from 'react-router-dom'
const jwt = require("jsonwebtoken");

const ProtectedStoreRouter = ({component: Component}) => {
  const sessionID = localStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');
  console.log("In route");
  console.log(user);
  console.log(user.role_id);
  console.log(Component);
  
  return (
    <Route render={() => {
      if(user.role_id===3)
        return <Component/>
      else
        return <Redirect to={{pathname: '/'}}/>
      }
    }/>
  )
}

export default ProtectedStoreRouter
