import React from 'react'
import ProductCard from '../../components/product/product_card';
import '../css/body.css';
import {products} from '../../components/product/test_products';

const Body = (props) => {
  return (
    <div className="container">
      Welcome to Rakoon E-Commerce
      {
        products.map((product)=>{
          return <ProductCard key={product.id} id={product.id} {...product} numOfItems={props.numOfItems} setNumOfItems={props.setNumOfItems}/>
        })
      }
    </div>
  )
}

export default Body