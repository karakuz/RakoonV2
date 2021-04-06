import React, { useState, useEffect} from 'react'
import Axios from 'axios'
import ProductCard from '../../components/product/product_card';
import '../css/body.css';
import Loading from './loading.gif';

const Cart = (props) => {
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID'); 
  const [products, setProducts] = useState([]);

  const getProducts = async() => {
    const res = await Axios({
      method: "POST",
      data:{
        sessionID: sessionID
      },
      withCredentials: true,
      url: `http://localhost:4000/getCartItems`,
    });
    setProducts(res.data);
  };

  useEffect(()=>{
    getProducts();
  },[]);

  if(products.length!==0 && typeof products !== typeof ''){
    return (
      <div className="container">
        {
          products.map((product)=>{
            return <ProductCard key={product.id} {...product} isRemovable={true} numOfItems={props.numOfItems} setNumOfItems={props.setNumOfItems}/>
          })
        }
      </div>
    )
  }
  else if(products[0]===undefined){
    return (
      <div className="container">
        <img src={Loading} alt='Loading...'/>
      </div>
    )
    
  }
  else{
    return (
      <div className="container">
        You have no item in your cart
      </div>
    )
    
  }
}

export default Cart