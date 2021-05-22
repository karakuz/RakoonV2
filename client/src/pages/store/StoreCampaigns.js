import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import StoreNav from './StoreNav'
const jwt = require("jsonwebtoken");

const StoreCampaings = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');

  /* const [byCategoryDiscount, setByCategoryDiscount] = useState("");
  const [byProductDiscount, setByProductDiscount] = useState("");
  const [byPriceDiscount, setByPriceDiscount] = useState("");

  const [byCategoryDateBy, setByCategoryDateBy] = useState("");
  const [byProductDateBy, setByProductDateBy] = useState("");
  const [byPriceDateBy, setByPriceDateBy] = useState("");

  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [priceBetween1, setPriceBetween1] = useState("");
  const [priceBetween2, setPriceBetween2] = useState(""); */

  const getCampaigns = async () => {
    const res = await Axios({
      method: "GET",
      data: {
        user_id: user.user_id,
        role_id: user.role_id
      },
      withCredentials: true,
      url: `/getCampaigns`,
    });
    setCampaigns(res.data);
  }

  const getItems = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        user_id: user.user_id,
        role_id: user.role_id
      },
      withCredentials: true,
      url: `/getStoreItems`,
    });
    setItems(res.data);
  }

  useEffect(() => {
    getCampaigns();
    getItems();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let productCategories = new Map();
    for(let item of items){
      if(productCategories.get(item.category) === undefined)
        productCategories.set(item.category,[item])
      else
        productCategories.set(item.category, [...productCategories.get(item.category), item])
    }
    
    setCategories(Array.from(productCategories.keys()));
  }, [items])

  const categorySubmit = async () => {

  }

  const productSubmit = async () => {
    
  }

  const priceSubmit = async () => {
    
  }

  return (
    <div>
      <StoreNav user={user} />

      <h3 style={{textAlign: "center"}}>Campaigns</h3>
      <div style={{border: "1px solid red", width: "80%", margin: "40px auto", padding: "20px"}}>
        {
          (campaigns.length === 0) ? <p>Store does not have any campaign</p>: <span>campaign</span>
        }
      </div>
      <h3 style={{textAlign: "center"}}>Deploy Campaign</h3>
      <div style={{border: "1px solid red", width: "80%", margin: "40px auto", padding: "20px"}}>
        
        <h5>By Category</h5>
        <div style={{display: "flex", justifyContent: "space-between", margin: "1.5rem 0 0 1rem"}}>
          <label style={{margin: "auto 0", fontSize: "16px"}}>Category</label>
          <select style={{width: "120px"}}>
            {
              categories.map( category => {
                return <option value={category}>{category}</option>
              })
            }
          </select>
          <label style={{margin: "auto 0", fontSize: "16px"}}>Discount</label>
          <input type="text" value="%" style={{width: "70px", marginLeft: "0"}}/>

          <label style={{margin: "auto 0", fontSize: "16px"}}>Date By</label>
          <input type="date" id="date"/>

          <input type="button" value="Deploy" id="category"/>
        </div>
        
        <h5 style={{marginTop: "2rem"}}>By Product</h5>
        <div style={{display: "flex", justifyContent: "space-between", margin: "1.5rem 0 0 1rem"}}>
          <label style={{margin: "auto 0", fontSize: "16px"}}>Product</label>
          <select style={{width: "200px"}}>
            {
              items.map( product => {
                return <option value={product.item_name}>{product.item_name}</option>
              })
            }
          </select>

          <label style={{margin: "auto 0", fontSize: "16px"}}>Discount</label>
          <input type="text" value="%" style={{width: "70px", marginLeft: "0"}}/>

          <label style={{margin: "auto 0", fontSize: "16px"}}>Date By</label>
          <input type="date" id="date"/>

          <input type="button" value="Deploy" id="product"/>

        </div>

        <h5 style={{marginTop: "2rem"}}>By Price</h5>
        <div style={{display: "flex", justifyContent: "space-between", margin: "1.5rem 0 0 1rem"}}>
          <label style={{margin: "auto 0", fontSize: "16px"}}>Price Between</label>
          <input type="number" style={{width: "80px"}}/>
          <span style={{margin: "auto 0", fontSize: "16px"}}>and</span>
          <input type="number" style={{width: "80px"}}/>
                    
          <label style={{margin: "auto 0", fontSize: "16px"}}>Discount</label>
          <input type="text" value="%" style={{width: "70px", marginLeft: "0"}}/>

          <label style={{margin: "auto 0", fontSize: "16px"}}>Date By</label>
          <input type="date" id="date"/>

          <input type="button" value="Deploy" id="price"/>
        </div>
      </div>
    </div>
  )
}

export default StoreCampaings
