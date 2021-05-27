import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Login from '../login/Login';
import Body from './Body';
import Cart from '../cart/cart';
import Register from "../register/register";
import NavigationBar from "../../components/Navbar/NavigationBar";
import ProtectedRoute from './Routes/ProtectedProfileRouter';
import ProtectedLoginRouter from './Routes/ProtectedLoginRouter';
import ProtectedStoreRoute from './Routes/ProtectedStoreRouter';
import Profile from '../user_page/Profile';
import Forgot from '../forgot/forgot';
import Reset from '../forgot/reset';
import Activate from '../login/activate';
import ProductScreen from './ProductScreen';
import Store_Register from '../register/store_register';
import CategoryPage from '../category/CategoryPage';
import Search from '../../components/search/Search';
import Store from '../store/Store';
import StoreAdd from '../store/StoreAdd';
import StoreShow from '../store/StoreShow';
import StoreItemEdit from '../store/StoreItemEdit';
import TwoFactorAuth from '../login/twofactorauth';
import Checkout from '../checkout/checkout';
import StoreAddSalesManager from '../store/StoreAddSalesManager';
import StoreComments from '../store/StoreComments';
import Privacy from '../user_page/Privacy';
import Orders from '../user_page/Orders';
import StoreOrders from '../store/StoreOrders';
import Wallet from '../user_page/Wallet';
import StoreCampaigns from '../store/StoreCampaigns';
import StoreSales from '../store/StoreSales';
import StoreNotification from '../store/StoreNotification';


const Main = () => {
  const [numOfItems, setNumOfItems] = useState(0);
  //const user = this.props.location.state;

  return (
    <>
      <NavigationBar numOfItems={numOfItems} setNumOfItems={setNumOfItems} />
      <Switch>
        <Route path="/" exact component={() => (<Body numOfItems={numOfItems} setNumOfItems={setNumOfItems} />)} />
        <ProtectedLoginRouter path="/login" component={Login} />
        <Route path="/two-factor-auth/:token" component={TwoFactorAuth} />
        <Route path="/cart" component={() => (<Cart numOfItems={numOfItems} setNumOfItems={setNumOfItems} />)} />
        <Route path="/register" component={Register} />
        <Route path="/checkout" component={() => (<Checkout numOfItems={numOfItems} setNumOfItems={setNumOfItems} />)} />
        <Route path="/store_register" component={Store_Register} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/reset/:token" component={Reset} />
        <Route path="/activate/:token" component={Activate} />
        <Route path="/product/:id" component={() => (<ProductScreen numOfItems={numOfItems} setNumOfItems={setNumOfItems} />)} />
        <Route path="/category/:name" component={() => <CategoryPage numOfItems={numOfItems} setNumOfItems={setNumOfItems} />} />
        <Route path="/search/:keyword" component={() => (<Search numOfItems={numOfItems} setNumOfItems={setNumOfItems} />)} />
        <ProtectedStoreRoute path="/store" exact component={Store} />
        <ProtectedStoreRoute path="/store/addproduct" exact component={StoreAdd} />
        <ProtectedStoreRoute path="/store/products" exact component={StoreShow} />
        <ProtectedStoreRoute path="/store/addsalesmanager" exact component={StoreAddSalesManager} />
        <ProtectedStoreRoute path="/store/campaigns" exact component={StoreCampaigns} />
        <ProtectedStoreRoute path="/store/comments" exact component={StoreComments} />
        <ProtectedStoreRoute path="/store/orders" exact component={StoreOrders} />
        <ProtectedStoreRoute path="/store/sales" exact component={StoreSales} />
        <ProtectedStoreRoute path="/store/notification" exact component={StoreNotification} />
        <Route path="/store/products/:item_id" component={StoreItemEdit} />
        <ProtectedRoute path="/profile" exact component={Profile} />
        <ProtectedRoute path="/profile/privacy" component={Privacy} />
        <ProtectedRoute path="/profile/orders" component={Orders} />
        <ProtectedRoute path="/profile/wallet" component={Wallet} />
      </Switch>
    </>
  )
}

export default withRouter(Main)
