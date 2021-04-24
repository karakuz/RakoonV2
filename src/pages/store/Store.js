import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import '../css/store.css';
import StoreNav from './StoreNav';
const jwt = require("jsonwebtoken");

const Store = () => {
  const [store, setStore] = useState("");

  const getStoreInfo = async () => {
    const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
    const user = await jwt.verify(sessionID, 'shhhhh');

    const res = await Axios({
      method: "POST",
      data: {
        user_id: user.user_id
      },
      withCredentials: true,
      url: `http://localhost:4000/getStoreInfo`,
    });
    setStore(res.data);
  }

  useEffect(() => {
    getStoreInfo();
  }, [])

  return (
    <div style={{margin:"2em"}}>
      <StoreNav/>
      <div style={{display: "flex", justifyContent: "center", marginTop: "2rem"}}>
        <div style={{width: "400px"}}>
          <h3 style={{textAlign: "center"}}>Store Info</h3>
          <table style={{ width: "400px", fontSize: "20px"}}>
            <tr>
              <th>Store Name:</th>
              <td>{store.store_name}</td>
            </tr>
            <tr>
              <th>Owner:</th>
              <td>{store.owner}</td>
            </tr>
            <tr>
              <th rowSpan={(store.items !== undefined ) ? store.items.length+1 : 1} style={{borderBottom: "hidden"}}>Products:</th>
            </tr>
            {
              (store.categories !== undefined) ?
              store.categories.map( category => {
                return (
                  <tr>
                    <td style={{borderBottom: "hidden"}}>{category[0]} : {category[1]}</td>
                  </tr>
                );  
              }) : "loading"
            }
          </table>
        </div>
      </div>
    </div>
  )
}

export default Store
