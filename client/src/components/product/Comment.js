import React from 'react'
import Stars from './Stars'
import '../../pages/css/comment_verify.css'
import Axios from 'axios';

const Comment = (props) => {

  const submit = async (e) => {
    e.preventDefault();
    const rating_id = props.comment.rating_id;
    const accept = parseInt(e.target.value);
    var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
    const res = await Axios({
      method: "PUT",
      data: {
        rating_id: rating_id,
        accept: accept
      },
      withCredentials: true,
      url: `${url}/verifyComment`,
    });
    if (res.data === "verified")
      alert("Comment has been verified")
    else
      alert("Comment has been rejected")
    const div = e.target.parentElement.parentElement;
    div.parentElement.removeChild(div);
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "2rem auto", padding: "1rem", width: "80%", boxShadow: "10px 10px 10px grey" }}>
        <div style={{  }} className="upperDiv">
          <span style={{  }} className="comment">{props.comment.comment}</span>
          <span className="commentStarSpan">
            <Stars rate={Math.floor(props.comment.rate)} />
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ maxWidth: "80%", fontStyle: "italic" }}>by {`${props.comment.name} ${props.comment.surname}`}</span>
          <span className="commentDate" style={{textAlign: "center"}}>on {props.comment.date}</span>
        </div>
        {
          (props.isVerifyPage) ?
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }} className="buttonDiv">
              <button onClick={(e) => submit(e)} value="1">Accept</button>
              <button onClick={(e) => submit(e)} value="0">Reject</button>
            </div>
            : null
        }
      </div>
    </div>
  )
}

export default Comment
