import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Comment from '../../components/product/Comment';
import StoreNav from './StoreNav';
import Loading from '../cart/loading.gif';
const jwt = require("jsonwebtoken");

const StoreComments = () => {
  const [comments, setComments] = useState([""]);

  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');

  const getComments = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        user_id: user.user_id
      },
      withCredentials: true,
      url: `/getStoreComments`,
    });
    setComments(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div style={{ marginTop: "1rem" }}>
      <StoreNav user={user} />
      <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Unverified Comments</h3>
      {
        (comments[0] === "") ?
          <>
            <div id="loading" style={{ display: "block" }}>
              <img src={Loading} alt='Loading...' style={{ display: 'block', margin: "0 auto" }} />
            </div>
          </>
          :
          (comments.length !== 0) ?
            comments.map((comment) => {
              return (
                <Comment comment={comment} isVerifyPage={true} />
              )
            }) : <h5 style={{ textAlign: "center", marginTop: "2rem" }}>You have no unverified comments</h5>
      }

    </div>
  )
}

export default StoreComments
