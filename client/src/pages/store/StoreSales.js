import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import StoreNav from './StoreNav'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
const jwt = require("jsonwebtoken");

const StoreSales = () => {
  const [sales, setSales] = useState({});

  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  console.log(url);

  const getSales = async () => {
    const res = await Axios({
      method: "POST",
      data: {
        user_id: user.user_id
      },
      withCredentials: true,
      url: `${url}/store/getSales`,
    });
    setSales(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    getSales();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <StoreNav user={user} />
      
      <div style={{margin: "0 auto", width: "50%"}}>
        <h3 style={{margin: "2rem 0", textAlign: "center"}}>Sales by number</h3>
        <BarChart width={600} height={300} data={sales.sales} style={{display: "block", margin: "0 auto"}}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc"}}/>
          <Legend 
            width={100} 
            wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="products" fill="#8884d8" barSize={30} />
        </BarChart>
      </div>
      <div style={{margin: "0 auto", width: "50%"}}>
        <h3 style={{margin: "2rem 0", textAlign: "center"}}>Sales by category</h3>
        <BarChart width={600} height={300} data={sales.category} style={{display: "block", margin: "0 auto"}}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc"}}/>
          <Legend 
            width={100} 
            wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="products" fill="#8884d8" barSize={30} />
        </BarChart>
      </div>
    </>
  )
}

export default StoreSales
