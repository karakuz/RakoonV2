import React from 'react'

const Star = (props) => {
  if ((parseInt(props.num) > parseInt(props.highlited)) && props.addComment === undefined) {
    return (
      <>
        <input type="radio" name="rate" value={props.num} />
        <label for={"star" + props.num} title="text" ></label>
      </>
    )
  } else if (props.addComment === undefined) {
    return (
      <>
        <input type="radio" name="rate" value={props.num} />
        <label htmlFor={"star" + props.num} title="text" style={{ color: "#ffc700" }}></label>
      </>
    )
  } else if (parseInt(props.num) > parseInt(props.highlited)) {
    return (
      <>
        <input type="radio" id={"star" + props.num} name="rate" value={props.num} onChange={(e) => props.setRate(parseInt(e.target.value))} />
        <label htmlFor={"star" + props.num} title="text"></label>
      </>
    )
  }

}

export default Star
