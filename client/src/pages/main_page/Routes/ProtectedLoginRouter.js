import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const ProtectedLoginRouter = ({component: Component}) => {
  const sessionID = localStorage.getItem('sessionID');
  
  return (
    <Route render={()=> {
      if(sessionID===null){
        return <Component/>
      }
      else
        return <Redirect to={{pathname: '/'}}/>  
      }
    }/>
  )
}


export default ProtectedLoginRouter
