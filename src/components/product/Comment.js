import React from 'react'
import Stars from './Stars'



const Comment = (props) => {
  return (
    <div style={{display: "flex"}}>
      <div style={{margin: "2rem auto", padding: "1rem", width: "80%", boxShadow: "10px 10px 10px grey"}}>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "1rem"}}>
          <span style={{maxWidth: "80%", fontSize: "1.3em"}}>{props.comment.comment}</span>
          <span style={{width: "16%"}}>
            <Stars rate={Math.floor(props.comment.rate)}/>
          </span>
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <span style={{maxWidth: "80%", fontStyle: "italic"}}>by {`${props.comment.name} ${props.comment.surname}`}</span>
          <span style={{width: "12.6%"}}>on {props.comment.date}</span>
        </div>
      </div>
    </div>
  )
}

export default Comment
