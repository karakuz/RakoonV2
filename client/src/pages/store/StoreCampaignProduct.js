import React from 'react'

const StoreCampaignProduct = (props) => {
  
 
  return (
    <>
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
                <p style={{marginBottom: "0.5rem"}}>Discount: {product.discount}</p>
                <p style={{marginBottom: "0.5rem"}}>New price: {product.new_price}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default StoreCampaignProduct
