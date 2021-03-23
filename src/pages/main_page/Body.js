import React from 'react'
import ProductCard from '../../components/product/product_card';
import '../css/body.css';


const Body = () => {
  return (
    <div className="container">
      Welcome to Rakoon E-Commerce
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    </div>
  )
}

export default Body