import React from 'react';

import LoginButton from '../../components/login_button/LoginButton';
import RakoonLogo from '../../components/rakoon_logo/RakoonLogo';
import Search from '../../components/search_button/Search';
import ShoppingCart from '../../components/shopping_cart/ShoppingCart';

//CSS
import '../css/header/header.css';

const Header = () => {
  return (
    <header>
      <RakoonLogo/>
      <div style={{display: "flex"}}>
        <Search/>
        <LoginButton/>
        <ShoppingCart/>
      </div>
    </header>
  )
}

export default Header

