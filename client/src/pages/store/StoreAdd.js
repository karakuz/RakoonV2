import React, { useEffect, useState } from 'react';
import StoreNav from './StoreNav';
import Axios from 'axios';
import '../css/store.css';
import '../css/register.css';
import redX from '../css/redX.jpg';
const jwt = require("jsonwebtoken");

const StoreAdd = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [brand, setBrand] = useState("");
  const [count, setCount] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);

  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');
  var URL = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  const getCategories = async () => {
    const res = await Axios({
      method: "GET",
      withCredentials: true,
      url: `${URL}/categories`,
    });
    setCategories(res.data);
    if (categories[0] !== undefined) setCategory("");
  }

  useEffect(() => {
    getCategories();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const queries = ["#name", "#description", "#price", "#category", "#count", "#brand"]

    let emptyInputs = [];
    for (let id of queries)
      if (document.querySelector(id).value === "")
        emptyInputs.push(id);

    if (emptyInputs.length !== 0) {
      for (let input of emptyInputs)
        document.querySelector(input).style.border = "3px solid red";

      document.querySelector('#emptyError').style.display = "flex";
      setTimeout(() => document.querySelector('#emptyError').style.display = "none", 3000);

      return;
    }
    const re = new RegExp("[+-]?([0-9]*[.])?[0-9]+");
    const regRes = re.exec(String(price))
    if (regRes.input !== regRes[0]) {
      document.querySelector('#priceErr').style.display = "flex";
      setTimeout(() => document.querySelector('#priceErr').style.display = "none", 3000);
      return;
    }

    const url = "https://api.cloudinary.com/v1_1/rakoon/image/upload";

    const files = document.querySelector("[type=file]").files;
    if (files.length > 1) {
      document.querySelector('#selectOnlyOneErr').style.display = "flex";
      setTimeout(() => document.querySelector('#selectOnlyOneErr').style.display = "none", 3000);
      return;
    }
    const file = (files.length === 1) ? document.querySelector("[type=file]").files[0] : null;

    if (file === null) {
      document.querySelector('#selectImgErr').style.display = "flex";
      setTimeout(() => document.querySelector('#selectImgErr').style.display = "none", 3000);
      return;
    };

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', "ml_default");

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, false);
    xhr.send(data);
    const imageResponse = JSON.parse(xhr.responseText);

    const imgURL = imageResponse.url;

    const item = {
      user_id: user.user_id,
      name: itemName,
      description: description,
      price: price,
      brand: brand,
      count: count,
      category: category,
      image: imgURL
    }

    const res = await Axios({
      method: "POST",
      data: {
        item: item
      },
      withCredentials: true,
      url: `${URL}/addProduct`,
    });

    if (res.data === "done")
      alert("Product is added")
  }

  return (
    <div style={{ margin: "2em", display: "flex", flexDirection: "column" }}>
      <StoreNav user={user} />
      <h3 style={{ textAlign: "center" }}>Add Product</h3>
      <div style={{ margin: "2em auto", display: "inline-flex", flexDirection: "column", fontSize: "1.3rem", width: "430px", position: "relative" }} id="add">
        <div style={{ display: "none", position: 'absolute', overflow: 'auto', width: '550px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='emptyError'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '8px' }}>
            <span style={{ fontSize: '20px' }}>One of the following inputs can not be empty</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>
        <div style={{ display: "none", position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='selectOnlyOneErr'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '8px' }}>
            <span style={{ fontSize: '20px' }}>Select only one image</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>
        <div style={{ display: "none", position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='selectImgErr'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '8px' }}>
            <span style={{ fontSize: '20px' }}>Select an image</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>
        <div style={{ display: "none", position: 'absolute', overflow: 'auto', width: '450px', boxShadow: '0 0 15px grey', background: 'white', top: '-90px', borderRadius: '10px' }} id='priceErr'>
          <img src={redX} alt="error" style={{ width: '70px', float: 'left' }} />
          <div style={{ flexGrow: '1', marginTop: '8px' }}>
            <span style={{ fontSize: '20px' }}>Enter valid price</span>
            <div className="progress-bar-error">
              <span className="progress-bar-inner"></span>
            </div>
          </div>
        </div>

        <div>
          <label>Name:</label>
          <input type="text" onChange={(e) => setItemName(e.target.value)} id="name" />
        </div>
        <div>
          <label>Description:</label>
          <textarea rows="5" cols="23" onChange={(e) => setDescription(e.target.value)} id="description"></textarea>
        </div>
        <div>
          <label>Price:</label>
          <input type="text" onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div style={{ position: "relative" }}>
          <label>Image:</label>
          <input name="file" type="file" style={{ position: "absolute", right: "0" }} />
          {/* <input type="file" style={{position: "absolute", right: "0"}}/> */}
        </div>
        <div>
          <label>Category</label>
          <select name="categories" onChange={(e) => setCategory(e.target.value)}>
            {<option value="" selected></option>}
            {
              categories.map(category => {
                const categoryName = category.category;
                return <option value={category.category}>{categoryName[0] + categoryName.slice(1)}</option>
              })
            }
          </select>
        </div>
        <div>
          <label>Count</label>
          <input type="number" min="1" onChange={(e) => setCount(e.target.value)} id="count" />
        </div>
        <div>
          <label>Brand</label>
          <input type="text" onChange={(e) => setBrand(e.target.value)} id="brand" />
        </div>
        <div style={{ display: "flex", marginTop: "1rem" }}>
          <input type="submit" value="Add Item" style={{ margin: "0 auto", width: "initial", background: "black", color: "white", padding: "0.5rem", borderRadius: "7px" }}
            onClick={(e) => submit(e)} />
        </div>
      </div>
    </div>
  )
}

export default StoreAdd
