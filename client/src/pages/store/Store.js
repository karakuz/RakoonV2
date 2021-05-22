import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import '../css/store.css';
import StoreNav from './StoreNav';
import Loading from '../cart/loading.gif';
const jwt = require("jsonwebtoken");

const Store = () => {
  const [store, setStore] = useState("");
  const [salesManagers, setSalesManagers] = useState([""]);
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');

  const getStoreInfo = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        user_id: user.user_id,
        role_id: user.role_id
      },
      withCredentials: true,
      url: `/getStoreInfo`,
    });
    setStore(res.data);
  }

  const getSalesManagers = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        user_id: user.user_id,
        role_id: user.role_id
      },
      withCredentials: true,
      url: `/getSalesManagers`,
    });
    setSalesManagers(res.data);
  }

  useEffect(() => {
    getStoreInfo();
    getSalesManagers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* console.log("salesManagers");
  console.log(salesManagers); */

  return (
    <div style={{ margin: "2em" }}>
      <StoreNav user={user} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        {
          (salesManagers[0] === "" || store === "") ?
            <div id="loading" style={{ display: "block" }}>
              <img src={Loading} alt='Loading...' style={{ display: 'block', margin: "0 auto" }} />
            </div>
            :
            <div style={{ width: "400px" }}>
              <h3 style={{ textAlign: "center" }}>Store Info</h3>
              <table style={{ width: "400px", fontSize: "20px" }}>
                <tr>
                  <th>Store Name:</th>
                  <td>{store.store_name}</td>
                </tr>
                <tr>
                  <th>Owner:</th>
                  <td>{store.owner}</td>
                </tr>
                <tr>
                  <th rowSpan={(store.items !== undefined) ? store.categories.length + 1 : 1}>Products:</th>
                </tr>
                {
                  (store.categories !== undefined) ?
                    store.categories.map(category => {
                      return (
                        <tr>
                          <td>{category[0]} : {category[1]}</td>
                        </tr>
                      );
                    }) : "loading"
                }
                <tr>
                  <th rowSpan={(salesManagers.length !== 0) ? salesManagers.length + 1 : 2} style={{ borderBottom: "hidden" }}>Sales Managers:</th>
                </tr>
                {
                  (salesManagers.length !== 0) ?
                    salesManagers.map(manager => {
                      return (
                        <tr>
                          <td style={{ borderBottom: "hidden" }}>{manager.name} {manager.surname}</td>
                        </tr>
                      );
                    })
                    :
                    <tr>
                      <td style={{ borderBottom: "hidden" }}>No Sales Managers Assigned</td>
                    </tr>
                }
              </table>
            </div>
        }

      </div>
    </div>
  )
}

export default Store
