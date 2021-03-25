import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Login from '../login/Login';
import Body from './Body';
import Cart from '../cart/cart';
import Register from "../register/register";
import NavigationBar from "../../components/Navbar/NavigationBar";
import ProtectedRoute from './Routes/ProtectedProfileRouter';
import ProtectedLoginRouter from './Routes/ProtectedLoginRouter';
import Profile from '../user_page/Profile';
import Forgot from '../forgot/forgot';
import Reset from '../forgot/reset';

const Main = () => {
  const [numOfItems, setNumOfItems] = useState(0);
  //const user = this.props.location.state;

  return (
    <>
      <NavigationBar numOfItems={numOfItems} setNumOfItems={setNumOfItems} />
      <Switch>
        <Route path="/" exact component={() => (<Body numOfItems={numOfItems} setNumOfItems={setNumOfItems} />)} />
        <ProtectedLoginRouter path="/login" component={Login} />
        <Route path="/cart" component={() => (<Cart numOfItems={numOfItems} setNumOfItems={setNumOfItems} />)} />
        <Route path="/register" component={Register} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/reset/:token" component={Reset} />
        <ProtectedRoute path="/profile" component={Profile} />
      </Switch>
    </>
  )
}

export default withRouter(Main)