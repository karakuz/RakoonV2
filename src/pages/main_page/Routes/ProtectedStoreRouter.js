import React from 'react'
import {Route, Redirect} from 'react-router-dom'
const jwt = require("jsonwebtoken");

const ProtectedStoreRouter = ({component: Component}) => {
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID'); 
  const user = jwt.verify(sessionID, 'shhhhh');
  
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
