import React from 'react'
import { useHistory } from 'react-router-dom';
import '../css/storeNav.css'

const StoreNav = (props) => {
  const history = useHistory();
  const user = props.user;

  if (user.role_id === 3) {
    return (
      <div style={{ marginBottom: "1rem" }} id='nav'>
        <span onClick={() => history.push("/store")}>Store Info</span>
        <span onClick={() => history.push("/store/addproduct")}>Add Product</span>
        <span onClick={() => history.push("/store/products")}>Products</span>
        <span onClick={() => history.push("/store/addsalesmanager")}>Add Sales Manager</span>
        <span onClick={() => history.push("/store/comments")} style={{ border: "none" }}>Comments</span>
      </div>
    )
  } else {
    return (
      <div style={{ marginBottom: "1rem" }} id='nav'>
        <span onClick={() => history.push("/store")}>Store Info</span>
        <span onClick={() => history.push("/store/products")}>Products</span>
        <span onClick={() => history.push("/store/campaigns")}>Campaigns</span>
        <span onClick={() => history.push("/store/sales")}>Sales</span>
        <span onClick={() => history.push("/store/notification")}>Send Notification</span>
        <span onClick={() => history.push("/store/orders")} style={{ border: "none" }}>Orders</span>
      </div>
    )
  }

}

export default StoreNav
