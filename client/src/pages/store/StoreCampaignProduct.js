import React from 'react'
import Axios from 'axios';

const StoreCampaignProduct = (props) => {
  const removeCampaign = async (e) => {
    e.preventDefault();

    const url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
    const res = await Axios({
      method: "POST",
      data: {
        campaign_id: props.id
      },
      withCredentials: true,
      url: `${url}/store/removeCampaign`,
    });
    if(res.data === "done"){
      alert("Campaign has been deleted")
      window.location.reload();
    }
  }
 
  return (
    <div style={{marginTop: "2rem"}}>
      <h4 style={{textAlign: "center", display: "block"}}>Campaign ID: {props.id}</h4>
      <div style={{display: "flex", flexWrap: "wrap"}}>
        {
          props.campaigns.map( product => {
            return( 
              <div style={{margin: "1rem", overflow: "auto", flex: "1 1 30.0%", fontSize: "16px"}}>
                <a href={`/product/${product.item_id}`} style={{float: "left", marginRight: "1rem"}}>
                  <img src={product.image} alt={product.name} style={{height: "120px"}}/>
                </a>
                <p style={{marginBottom: "0.5rem"}}><i>{product.item_name}</i></p>
                <p style={{marginBottom: "0.5rem"}}>Old price: {product.old_price}</p>
                <p style={{marginBottom: "0.5rem"}}>Discount: {'%' + String(product.discount * 100)}</p>
                <p style={{marginBottom: "0.5rem"}}>New price: {product.new_price}</p>
              </div>
            )
          })
        }
      </div>
      <input type="button" value="Cancel Campaign" 
        style={{ display: "block", margin: "0 auto", padding: "7px", color: "white", backgroundColor: "blue", fontSize: "1.3rem", borderRadius: "7px" }} 
        onClick={e => removeCampaign(e)}
      />
    </div>
  )
}

export default StoreCampaignProduct
