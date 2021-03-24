import React from 'react'
import ProductCard from '../../components/product/product_card';
import '../css/body.css';

const Cart = (props) => {
  const keys = Object.keys(localStorage);
  let products=[];

  for(let key of keys){
    const object = localStorage.getItem(parseInt(key));
    products.push(JSON.parse(object));
  }
  console.log(keys.length===0);
  if(keys.length!==0){
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
  else{
    return (
      <div className="container">
        You have no item in your cart
      </div>
    )
    
  }
}

export default Cart