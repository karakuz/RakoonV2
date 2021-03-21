import React from 'react';
import {Link} from 'react-router-dom';

import LoginButton from '../../components/login_button/LoginButton';
import RakoonLogo from '../../components/rakoon_logo/RakoonLogo';
import Search from '../../components/search_button/Search';
import ShoppingCart from '../../components/shopping_cart/ShoppingCart';

//CSS
import '../css/header.css';

const Header = () => {
  return (
    <header>
      <Link to="/">
        <RakoonLogo/>
      </Link>
      <div style={{display: "flex"}}>
        <Search/>
        <LoginButton/>
        <ShoppingCart/>
      </div>
    </header>
  )
}

export default Header

