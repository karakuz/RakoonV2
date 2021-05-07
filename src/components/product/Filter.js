import React from 'react'

const Filter = (props) => {
  const [min, setMin] = React.useState();
  const [max, setMax] = React.useState();
  const products = props.products;

  const find = () => {
    console.log(min);
    console.log(max);

    const res = products.filter(product => product.price < 9999 && product.price > 0)
    console.log(res);
  }

  return (
    <div className="form-group">
      <label>Price</label>
      <input id="min" type="number" onChange={(e)=> setMin(parseInt(e.target.value))}/>
      <input id="max" type="number"  onChange={(e)=> setMax(parseInt(e.target.value))}/>
      <input type="button" onClick={()=>find()} value="search"/>
    </div>
  )
}

export default Filter
