import React from 'react'
import Stars from './Stars';
import Axios from 'axios';

const AddComment = (props) => {
  const [comment, setComment] = React.useState("");
  const [rate, setRate] = React.useState(0);
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');

  const submit = async (e) => {
    e.preventDefault();
    if(comment.length === 0){
      alert("Please add a comment")
      return
    }
    if(rate === 0){
      alert("Please choose a rate") 
      return
    }
    
    const today = new Date();
    const mm = (today.getMonth()+1<10) ? '0' + String(today.getMonth()+1) : String(today.getMonth()+1);
    const dd = (today.getDate()<10) ? '0' + String(today.getDate()) : String(today.getDate());
    const date = `${String(today.getFullYear())}-${mm}-${dd}`;
    
    const res = await Axios({
      method: "POST",
      data:{
        data: {
          user_id: props.user.user_id,
          date: date,
          comment: comment,
          rate: rate,
          productID: parseInt(props.productID)
        }
      },
      withCredentials: true,
      url: `http://localhost:4000/addComment`,
    });
    if(res.data === "done"){
      alert("Your comment has been added. Its on approvement process");
      window.location.reload();
    }
  }

  return (
    <div style={{display: "flex", flexDirection:"column"}}>
      <div style={{margin:"2em auto", display: "inline-flex", flexDirection:"column", fontSize: "1.3rem", width:"430px", position: "relative"}} id="add">
        <div style={{display: "flex", alignItems: "center"}} id="rate">
          <span>Rate:</span>
          <Stars rate={0} setRate={setRate} addComment={true} id={"rate"}/>
        </div>
        <div>
          <label>Comment:</label>
          <textarea rows="5" cols="22" onChange={(e)=> setComment(e.target.value)} id="comment"></textarea>
        </div>
        <div style={{display: "flex", marginTop:"1rem"}}>
          <input type="submit" value="Add Comment" style={{margin: "0 auto", width: "initial", background: "black", color: "white", padding: "0.5rem", borderRadius: "7px"}} 
            onClick={(e)=> submit(e)}/>
        </div>
      </div>  
    </div>
  )
}

export default AddComment
