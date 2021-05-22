import React from 'react'
import {Route, Redirect} from 'react-router-dom'
let jwt = require('jsonwebtoken');

const ProtectedRoute = ({component: Component}) => {
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID'); 
  
  return (
    <Route render={()=> {
      if(sessionID!==null){
        const user = jwt.verify(sessionID, 'shhhhh')
        return <Component user={user}/>
      }
      else
        return <Redirect to={{pathname: '/login'}}/>  
    }
  }/>
  )
}

export default ProtectedRoute
