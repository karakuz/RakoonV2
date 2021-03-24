import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = ({component: Component , ...rest}) => {
  return (
    <Route 
      {...rest} render={(props)=> {
      if(rest.role_id===1)//if regular user
        return <Component />
      else
        return <Redirect to={{pathname: '/', state: {from: props.location}}}/>  
    }
  }/>
  )
}

export default ProtectedRoute
