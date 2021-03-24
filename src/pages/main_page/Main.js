import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../login/Login';
import Body from './Body';
import Cart from '../cart/cart';
import Register from "../register/register";
import NavigationBar from "../../components/Navbar/NavigationBar";

const Main = () => {
  const [numOfItems, setNumOfItems] = useState(0);

  return (
    <Router>
      <NavigationBar numOfItems={numOfItems} setNumOfItems={setNumOfItems}/>
      <Switch>
        <Route path="/" exact component={()=> (<Body numOfItems={numOfItems} setNumOfItems={setNumOfItems}/>)}/>
        <Route path="/login" component={Login} />
        <Route path="/cart" component={()=> (<Cart numOfItems={numOfItems} setNumOfItems={setNumOfItems}/>)} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  )
}

export default Main
