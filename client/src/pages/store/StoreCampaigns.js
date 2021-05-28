import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import StoreNav from './StoreNav'
import StoreCampaignProduct from './StoreCampaignProduct';
const jwt = require("jsonwebtoken");

const StoreCampaings = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');

  const [byCategoryDiscount, setByCategoryDiscount] = useState(0);
  const [byProductDiscount, setByProductDiscount] = useState(0);
  const [byPriceDiscount, setByPriceDiscount] = useState(0);

  const [byCategoryDateBy, setByCategoryDateBy] = useState("");
  const [byProductDateBy, setByProductDateBy] = useState("");
  const [byPriceDateBy, setByPriceDateBy] = useState("");

  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [priceBetween1, setPriceBetween1] = useState("");
  const [priceBetween2, setPriceBetween2] = useState("");

  var today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd ;

  const getCampaigns = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        user_id: user.user_id,
        role_id: user.role_id
      },
      withCredentials: true,
      url: `${url}/getCampaigns`,
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
      url: `${url}/getStoreItems`,
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
    for (let item of items) {
      if (productCategories.get(item.category) === undefined)
        productCategories.set(item.category, [item])
      else
        productCategories.set(item.category, [...productCategories.get(item.category), item])
    }

    setCategories(Array.from(productCategories.keys()));
  }, [items])

  const categorySubmit = async (e) => {
    e.preventDefault();

    if (category === "" || byCategoryDiscount <= 0 || byCategoryDateBy === "") {
      alert("Fill the appropiate blanks");
      return;
    }
    if( Date.parse(today) >= Date.parse(byCategoryDateBy) ){
      alert("Select a day after today")
    }

    let item_ids = [];
    for (let item of items)
      if (item.category === category)
        item_ids.push(item.item_id)

    /* console.log(item_ids);
    console.log(`category: ${category}\ndiscount: ${byCategoryDiscount}\ndate by:${byCategoryDateBy} `); */

    const res = await Axios({
      method: "POST",
      data: {
        item_ids: item_ids,
        user_id: user.user_id,
        discount: byCategoryDiscount,
        date: byCategoryDateBy
      },
      withCredentials: true,
      url: `${url}/store/deployCampaignByCategory`,
    });
    if (res.data === "done") {
      alert("campaign has been added")
      window.location.reload();
    }
  }

  const productSubmit = async (e) => {
    e.preventDefault();
    if (product === "" || byProductDiscount <= 0 || byProductDateBy === "") {
      alert("Fill the appropiate blanks");
      return;
    }

    if( Date.parse(today) >= Date.parse(byProductDateBy) ){
      alert("Select a day after today")
    }

    const res = await Axios({
      method: "POST",
      data: {
        product: product,
        user_id: user.user_id,
        discount: byProductDiscount,
        date: byProductDateBy
      },
      withCredentials: true,
      url: `${url}/store/deployCampaignByProduct`,
    });
    if (res.data === "done") {
      alert("campaign has been added")
      window.location.reload();
    }
  }

  const priceSubmit = async (e) => {
    e.preventDefault();

    if (priceBetween1 === 0 
      || priceBetween2 === 0 
      || byPriceDateBy === "" 
      || (parseFloat(priceBetween1) - parseFloat(priceBetween2) <= 0)) {
      alert("Fill the blanks appropriately");
      return;
    }

    if( Date.parse(today) >= Date.parse(byPriceDateBy) ){
      alert("Select a day after today")
    }

    const res = await Axios({
      method: "POST",
      data: {
        minPrice: priceBetween1,
        maxPrice: priceBetween2,
        user_id: user.user_id,
        discount: byPriceDiscount,
        date: byPriceDateBy
      },
      withCredentials: true,
      url: `${url}/store/deployCampaignByPrice`,
    });
    if (res.data === "done") {
      alert("campaign has been added")
      window.location.reload();
    }
  }

  return (
    <div>
      <StoreNav user={user} />

      <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Campaigns</h3>
      <div style={{ borderRadius: '15px', boxShadow: '0 0 15px grey', width: "80%", margin: "40px auto", padding: "20px" }}>
        {
          (campaigns.length === 0) ?
            <p style={{ textAlign: "center", fontSize: "1.3rem" }}>Store does not have any campaign</p>
            :
            <div style={{}}>
              {
                Object.keys(campaigns).map(campaign_id => {
                  return <StoreCampaignProduct id={campaign_id} campaigns={campaigns[campaign_id]} />
                })
              }
            </div>
        }
      </div>
      {(user.role_id === 2) ?
        <>
          <h3 style={{ textAlign: "center" }}>Deploy Campaign</h3>
          <div style={{ borderRadius: '15px', boxShadow: '0 0 15px grey', width: "80%", margin: "40px auto", padding: "20px" }}>

            <h5>By Category</h5>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "1.5rem 0 0 1rem" }}>
              <div style={{ width: "350px" }}>
                <label style={{ margin: "auto 0.8rem 0 0", fontSize: "16px", width: "75px" }}>Category</label>
                <select style={{ width: "120px", padding: '7px' }} onChange={e => setCategory(e.target.value)}>
                  {<option value="" selected></option>}
                  {
                    categories.map(category => {
                      return <option value={category}>{category}</option>
                    })
                  }
                </select>
              </div>
              <div style={{ position: "relative" }}>
                <label style={{ margin: "auto 0.8rem 0 0", fontSize: "16px" }}>Discount</label>
                <span style={{ position: "absolute", fontSize: "1rem", top: "8px", right: "52px" }}>%</span>
                <input type="number" value={byCategoryDiscount} style={{ width: "70px", marginLeft: "0", padding: "7px 7px 7px 16px" }} onChange={e => setByCategoryDiscount(parseInt(e.target.value))} />
              </div>
              <div>
                <label style={{ margin: "auto 0.8rem 0 0", fontSize: "16px" }}>Date By</label>
                <input type="date" id="date" onChange={e => setByCategoryDateBy(e.target.value)} style={{padding: "7px"}}/>
              </div>

              <input type="submit" value="Deploy" id="category" onClick={(e) => categorySubmit(e)} style={{padding: "7px", color: "white", backgroundColor: "blue", borderRadius: "5px"}}/>
            </div>

            <h5 style={{ marginTop: "2rem" }}>By Product</h5>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "1.5rem 0 0 1rem" }}>
              <div style={{ width: "350px" }}>
                <label style={{ margin: "auto 0.8rem 0 0", fontSize: "16px", width: "75px" }}>Product</label>
                <select style={{ width: "200px", padding: "7px" }} onChange={e => setProduct(e.target.value)}>
                  {<option value="" selected></option>}
                  {
                    items.map(product => {
                      return <option value={product.item_name}>{product.item_name}</option>
                    })
                  }
                </select>
              </div>
              <div style={{ position: "relative" }}>
                <label style={{ margin: "auto 0.8rem 0 0", fontSize: "16px" }}>Discount</label>
                <span style={{ position: "absolute", fontSize: "1rem", top: "8px", right: "52px" }}>%</span>
                <input type="number" value={byProductDiscount} style={{ width: "70px", marginLeft: "0", padding: "7px 7px 7px 16px" }} onChange={e => setByProductDiscount(parseInt(e.target.value))} />
              </div>
              <div>
                <label style={{ margin: "auto 0.8rem 0 0", fontSize: "16px" }}>Date By</label>
                <input type="date" id="date" onChange={e => setByProductDateBy(e.target.value)} style={{ padding: "7px" }}/>
              </div>

              <input type="submit" value="Deploy" id="product" onClick={(e) => productSubmit(e)} style={{padding: "7px", color: "white", backgroundColor: "blue", borderRadius: "5px"}}/>
            </div>

            <h5 style={{ marginTop: "2rem" }}>By Price</h5>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "1.5rem 0 0 1rem" }}>
              <div style={{ width: "350px" }}>
                <label style={{ margin: "auto 0.8rem 0 0", fontSize: "16px" }}>Price Between</label>
                <input type="number" style={{ width: "80px", marginRight: "0.8rem", padding: "7px" }} onChange={e => setPriceBetween1(parseFloat(e.target.value))} />
                <span style={{ margin: "auto 0.8rem 0 0", fontSize: "16px" }}>and</span>
                <input type="number" style={{ width: "80px", padding: "7px" }} onChange={e => setPriceBetween2(parseFloat(e.target.value))} />
              </div>
              <div style={{ position: "relative" }}>
                <label style={{ margin: "auto 0.8rem 0 0", fontSize: "16px" }}>Discount</label>
                <span style={{ position: "absolute", fontSize: "1rem", top: "8px", right: "52px" }}>%</span>
                <input type="number" value={byPriceDiscount} style={{ width: "70px", marginLeft: "0", padding: "7px 7px 7px 16px" }} onChange={e => setByPriceDiscount(parseInt(e.target.value))} />
              </div>
              <div>
                <label style={{ margin: "auto 0.8rem 0 0", fontSize: "16px", padding: "7px" }}>Date By</label>
                <input type="date" id="date" onChange={e => setByPriceDateBy(e.target.value)} style={{ padding: "7px" }}/>
              </div>
              <input type="submit" value="Deploy" id="price" onClick={(e) => priceSubmit(e)} style={{padding: "7px", color: "white", backgroundColor: "blue", borderRadius: "5px"}}/>
            </div>
          </div>
        </>
        : null}
    </div>
  )
}

export default StoreCampaings
