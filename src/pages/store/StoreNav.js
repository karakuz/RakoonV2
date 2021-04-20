import React from 'react'
import { useHistory } from 'react-router-dom';

const StoreNav = () => {
  const history = useHistory();

  return (
    <div style={{marginBottom: "1rem"}} id='nav'>
      <span onClick={()=> history.push("/store")}>Store Info</span>
      <span onClick={()=> history.push("/store/additem")}>Add Item</span>
      <span  onClick={()=> history.push("/store/showitems")} style={{border: "none"}}>Show Items</span>
    </div>
  )
}

export default StoreNav
