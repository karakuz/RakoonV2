import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import StoreNav from './StoreNav'
import StoreCampaignProduct from './StoreCampaignProduct';
const jwt = require("jsonwebtoken");

const StoreCampaings = () => {
  const [campaigns, setCampaigns] = useState({});
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');

  const [byCategoryDiscount, setByCategoryDiscount] = useState("%");
  const [byProductDiscount, setByProductDiscount] = useState("%");
  const [byPriceDiscount, setByPriceDiscount] = useState("%");

  const [byCategoryDateBy, setByCategoryDateBy] = useState("");
  const [byProductDateBy, setByProductDateBy] = useState("");
  const [byPriceDateBy, setByPriceDateBy] = useState("");

  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [priceBetween1, setPriceBetween1] = useState("");
  const [priceBetween2, setPriceBetween2] = useState("");

  const getCampaigns = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        user_id: user.user_id,
        role_id: user.role_id
      },
      withCredentials: true,
      url: `/getCampaigns`,
    });
    setCampaigns(res.data);
    console.log(res.data);
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

  const categorySubmit = async (e) => {
    e.preventDefault();
    let item_ids = [];

    for(let item of items) 
      if(item.category === category) 
        item_ids.push(item.item_id)
    
    console.log(item_ids);
    console.log(`category: ${category}\ndiscount: ${byCategoryDiscount}\ndate by:${byCategoryDateBy} `);
  
    const res = await Axios({
      method: "POST",
      data: {
        item_ids: item_ids,
        user_id: user.user_id,
        discount: byCategoryDiscount,
        date: byCategoryDateBy
      },
      withCredentials: true,
      url: `http://localhost:4000/store/deployCampaignByCategory`,
    });
    if(res.data === "done"){
      alert("campaign has been added")
      window.location.reload();
    }
  }

  const productSubmit = async (e) => {
    e.preventDefault();
    console.log(`category: ${product}\ndiscount: ${byProductDiscount}\ndate by:${byProductDateBy} `);
    
  }

  const priceSubmit = async (e) => {
    e.preventDefault();
    console.log(`price between: ${priceBetween1} - ${priceBetween2}\ndiscount: ${byPriceDiscount}\ndate by:${byPriceDateBy} `);
    
  }

  return (
    <div>
      <StoreNav user={user} />

      <h3 style={{textAlign: "center"}}>Campaigns</h3>
      <div style={{border: "1px solid red", width: "80%", margin: "40px auto", padding: "20px"}}>
        {
          (campaigns.length === 0) ? 
          <p>Store does not have any campaign</p>
          : 
          <div style={{}}>
            { 
              Object.keys(campaigns).map( campaign_id => {
                return <StoreCampaignProduct id={campaign_id} campaigns={campaigns[campaign_id]}/> 
              })
            }
          </div>
        }
      </div>
      <h3 style={{textAlign: "center"}}>Deploy Campaign</h3>
      <div style={{border: "1px solid red", width: "80%", margin: "40px auto", padding: "20px"}}>
        
        <h5>By Category</h5>
        <div style={{display: "flex", justifyContent: "space-between", margin: "1.5rem 0 0 1rem"}}>
          <label style={{margin: "auto 0", fontSize: "16px"}}>Category</label>
          <select style={{width: "120px"}} onChange={e => setCategory(e.target.value)}>
            {<option value="" selected></option>}
            {
              categories.map( category => {
                return <option value={category}>{category}</option>
              })
            }
          </select>
          <label style={{margin: "auto 0", fontSize: "16px"}}>Discount</label>
          <input type="text" value={byCategoryDiscount} style={{width: "70px", marginLeft: "0"}} onChange={e => setByCategoryDiscount(e.target.value)}/>

          <label style={{margin: "auto 0", fontSize: "16px"}}>Date By</label>
          <input type="date" id="date" onChange={e => setByCategoryDateBy(e.target.value)}/>

          <input type="submit" value="Deploy" id="category" onClick={(e) => categorySubmit(e)}/>
        </div>
        
        <h5 style={{marginTop: "2rem"}}>By Product</h5>
        <div style={{display: "flex", justifyContent: "space-between", margin: "1.5rem 0 0 1rem"}}>
          <label style={{margin: "auto 0", fontSize: "16px"}}>Product</label>
          <select style={{width: "200px"}} onChange={e => setProduct(e.target.value)}>
            {<option value="" selected></option>}
            {
              items.map( product => {
                return <option value={product.item_name}>{product.item_name}</option>
              })
            }
          </select>

          <label style={{margin: "auto 0", fontSize: "16px"}}>Discount</label>
          <input type="text" value={byProductDiscount} style={{width: "70px", marginLeft: "0"}} onChange={ e => setByProductDiscount(e.target.value)}/>

          <label style={{margin: "auto 0", fontSize: "16px"}}>Date By</label>
          <input type="date" id="date" onChange={ e => setByProductDateBy(e.target.value)}/>

          <input type="submit" value="Deploy" id="product" onClick={(e) => productSubmit(e)}/>

        </div>

        <h5 style={{marginTop: "2rem"}}>By Price</h5>
        <div style={{display: "flex", justifyContent: "space-between", margin: "1.5rem 0 0 1rem"}}>
          <label style={{margin: "auto 0", fontSize: "16px"}}>Price Between</label>
          <input type="number" style={{width: "80px"}} onChange={ e => setPriceBetween1(parseFloat(e.target.value))}/>
          <span style={{margin: "auto 0", fontSize: "16px"}}>and</span>
          <input type="number" style={{width: "80px"}} onChange={ e => setPriceBetween2(parseFloat(e.target.value))}/>
                    
          <label style={{margin: "auto 0", fontSize: "16px"}}>Discount</label>
          <input type="text" value={byPriceDiscount} style={{width: "70px", marginLeft: "0"}} onChange={ e => setByPriceDiscount(e.target.value)}/>

          <label style={{margin: "auto 0", fontSize: "16px"}}>Date By</label>
          <input type="date" id="date" onChange={ e => setByPriceDateBy(e.target.value)}/>

          <input type="submit" value="Deploy" id="price" onClick={(e) => priceSubmit(e)}/>
        </div>
      </div>
    </div>
  )
}

export default StoreCampaings
