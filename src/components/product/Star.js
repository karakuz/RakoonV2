import React from 'react'

const Star = (props) => {
  console.log(props);
  if(parseInt(props.num) > parseInt(props.highlited)){
    return (
      <>
        <input type="radio" name="rate" value={props.num}/>
        <label for={"star" + props.num} title="text" ></label>
      </>
    )
  } else {
    return (<>
      <input type="radio" name="rate" value={props.num}/>
      <label for={"star" + props.num} title="text" style={{color: "#deb217"}}></label>
    </>)
  }
  
}

export default Star
