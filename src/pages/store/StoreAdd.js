import React, { useEffect, useState } from 'react';
import StoreNav from './StoreNav';
import Axios from 'axios';
import '../css/store.css';
const jwt = require("jsonwebtoken");

const StoreAdd = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [brand, setBrand] = useState("");
  const [count, setCount] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const res = await Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/categories`,
    });
    setCategories(res.data);
    console.log(categories);
    if(categories[0]!==undefined) setCategory(categories[0].category);
  }

  useEffect(() => {
    getCategories();
  }, []);

  const submit = async (e) =>{
    e.preventDefault();
    const url = "https://api.cloudinary.com/v1_1/rakoon/image/upload";
    const file = document.querySelector("[type=file]").files[0];
    
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', "ml_default");

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, false);
    xhr.send(data);
    const imageResponse = JSON.parse(xhr.responseText);

    const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
    const user = await jwt.verify(sessionID, 'shhhhh');

    const imgURL = imageResponse.url;
     
    const item = {
      user_id: user.user_id,
      name : itemName,
      description: description,
      price: price,
      brand: brand,
      count: count,
      category: category,
      img: imgURL
    }
    console.log(item);
  }

  return (
    <div style={{margin:"2em", display: "flex", flexDirection:"column"}}>
      <StoreNav/>
      <h3 style={{textAlign: "center"}}>Add Item</h3>
      <div style={{margin:"2em auto", display: "inline-flex", flexDirection:"column", fontSize: "1.3rem", width:"430px"}} id="add">
        <div>
          <label>Name:</label>
          <input type="text" onChange={(e)=> setItemName(e.target.value)}/>
        </div>
        <div>
          <label>Description:</label>
          <textarea rows="5" cols="23" onChange={(e)=> setDescription(e.target.value)}></textarea>
        </div>
        <div>
          <label>Price:</label>
          <input type="text" onChange={(e)=> setPrice(e.target.value)}/>
        </div>
        <div style={{position: "relative"}}>
          <label>Image:</label>
          <input name="file" type="file" style={{position: "absolute", right: "0"}}/>
          {/* <input type="file" style={{position: "absolute", right: "0"}}/> */}
        </div>
        <div>
          <label>Category</label>
          <select name="categories" id="categories" onChange={(e)=> setCategory(e.target.value)}>
            {
              categories.map( category => {
                return <option value={category.category}>{category.category}</option>
              })
            }
          </select>
        </div>
        <div>
          <label>Count</label>
          <input type="number" min="1" onChange={(e)=> setCount(e.target.value)}/>
        </div>
        <div>
          <label>Brand</label>
          <input type="text" onChange={(e)=> setBrand(e.target.value)}/>
        </div>
        <div style={{display: "flex", marginTop:"1rem"}}>
          <input type="submit" value="Add Item" style={{margin: "0 auto", width: "initial", background: "black", color: "white", padding: "0.5rem", borderRadius: "7px"}} 
            onClick={(e)=> submit(e)}/>
        </div>
      </div>  
    </div>
  )
}

export default StoreAdd
