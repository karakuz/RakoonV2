import React from 'react'
import ProductCard from '../../components/product/product_card';
import '../css/body.css';
import {products} from '../../components/product/test_products';
import { Alert} from 'react-bootstrap';

const Body = (props) => {
  return (
    <div>
    <h3 style={{textAlign: 'center', margin: '1rem'}}>
    Welcome to Rakoon E-Commerce!
     </h3>
    <div className="container">
      
      {
        products.map((product)=>{
          return <ProductCard key={product.id} id={product.id} {...product} numOfItems={props.numOfItems} setNumOfItems={props.setNumOfItems}/>
        })
      }  
    </div>
    </div>
  )
}

export default Body