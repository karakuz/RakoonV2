import React from 'react'
import { useHistory } from 'react-router-dom';

const StoreNav = () => {
  const history = useHistory();

  return (
    <div style={{marginBottom: "1rem"}} id='nav'>
      <span onClick={()=> history.push("/store")}>Store Info</span>
      <span onClick={()=> history.push("/store/addproduct")}>Add Product</span>
      <span  onClick={()=> history.push("/store/products")} style={{border: "none"}}>Products</span>
    </div>
  )
}

export default StoreNav
