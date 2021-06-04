/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import Axios from 'axios';
import '../css/store.css';
import StoreNav from './StoreNav';
import redX from '../css/redX.jpg';
const jwt = require("jsonwebtoken");

const StoreItemEdit = () => {
  const { item_id } = useParams();
  const [product, setProduct] = useState([]);
  const [productID, setProductID] = useState([]);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [brand, setBrand] = useState("");
  const [count, setCount] = useState();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const ref = useRef(false);
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  const history = useHistory();
  const queries = ["#name", "#description", "#price", "#category", "#count", "#brand"]
  const sessionID = null || localStorage.getItem('sessionID') || sessionStorage.getItem('sessionID');
  const user = jwt.verify(sessionID, 'shhhhh');

  useEffect(() => {
    (async () => {
      const res = await Axios({
        method: "GET",
        withCredentials: true,
        url: `${url}/categories`,
      });
      setCategories(res.data);

      const res_ = await Axios({
        method: "GET",
        withCredentials: true,
        url: `${url}/product/${item_id}`,
      });
      setProduct(res_.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setProductID(product.item_id);
    setItemName(product.item_name);
    setDescription(product.description);
    setPrice(product.price);
    setBrand(product.brand);
    setCount(product.countInStock);
    setCategory(product.category);
  }, [product])

  useEffect(() => { if (ref.current) document.querySelectorAll('.list-group-item>h3')[0].innerText = itemName }, [itemName])
  useEffect(() => { if (ref.current) document.querySelectorAll('.list-group-item')[2].innerText = description }, [description])
  useEffect(() => { if (ref.current) document.querySelectorAll('.list-group-item')[1].innerText = document.querySelectorAll('.list-group-item')[1].innerText.substring(0, 8) + price }, [price])

  const submit = async (e) => {
    e.preventDefault();

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

    if (price !== null) {
      const re = new RegExp("[+-]?([0-9]*[.])?[0-9]+");
      const regRes = re.exec(String(price))
      if (regRes.input !== regRes[0]) {
        document.querySelector('#priceErr').style.display = "flex";
        setTimeout(() => document.querySelector('#priceErr').style.display = "none", 3000);
        return;
      }
    }

    const url = "https://api.cloudinary.com/v1_1/rakoon/image/upload";

    const files = document.querySelector("[type=file]").files;
    if (files.length > 1) {
      document.querySelector('#selectOnlyOneErr').style.display = "flex";
      setTimeout(() => document.querySelector('#selectOnlyOneErr').style.display = "none", 3000);
      return;
    }
    const file = (files.length === 1) ? document.querySelector("[type=file]").files[0] : null;
    let imgURL;

    if (file === null)
      imgURL = product.image;
    else {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', "ml_default");

      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, false);
      xhr.send(data);
      const imageResponse = JSON.parse(xhr.responseText);
      imgURL = imageResponse.url;
    }

    const item = {
      user_id: user.user_id,
      item_id: productID,
      name: itemName,
      description: description,
      price: price,
      brand: brand,
      count: count,
      category: category,
      image: imgURL
    }
    const res = await Axios({
      method: "PUT",
      data: {
        item: item
      },
      withCredentials: true,
      url: `${url}/editProduct`,
    });
    if (res.data === "done") {
      alert("Updated")
      history.push("/store/products")
    }
  }

  const setPreview = (e) => { document.querySelectorAll('img')[4].src = URL.createObjectURL(e.target.files[0]); console.log("fired"); }

  return (
    <div style={{ margin: "2em", display: "flex", flexDirection: "column" }}>
      <StoreNav user={user}/>
      <h3 style={{ textAlign: "center" }}>Edit Product</h3>
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
          <input type="text" onChange={(e) => { setItemName(e.target.value); ref.current = true }} value={itemName} id="name" />
        </div>
        <div>
          <label>Description:</label>
          <textarea rows="5" cols="23" onChange={(e) => { setDescription(e.target.value); ref.current = true }} value={description} id="description"></textarea>
        </div>
        <div>
          <label>Price:</label>
          <input type="text" onChange={(e) => { setPrice(parseFloat(e.target.value)); ref.current = true }} value={price} id="price" />
        </div>
        <div style={{ position: "relative" }}>
          <label>Image:</label>
          <button style={{ display: "block", width: "275px", height: "35px" }} onClick={() => document.getElementById('image').click()}>Change Image</button>

          <input name="file" type="file" style={{ position: "absolute", right: "0", display: "none" }} onChange={(e) => setPreview(e)} id="image" />
          {/* <input type="file" style={{position: "absolute", right: "0"}}/> */}
        </div>
        <div>
          <label>Category</label>
          <select name="categories" id="categories" onChange={(e) => setCategory(e.target.value)} value={category} id="category">
            {
              categories.map(category => {
                return <option value={category.category}>{category.category}</option>
              })
            }
          </select>
        </div>
        <div>
          <label>Count</label>
          <input type="number" min="1" onChange={(e) => setCount(e.target.value)} value={count} id="count" />
        </div>
        <div>
          <label>Brand</label>
          <input type="text" onChange={(e) => setBrand(e.target.value)} value={brand} id="brand" />
        </div>
        <div style={{ display: "flex", marginTop: "1rem" }}>
          <input type="submit" value="Update" style={{ margin: "0 auto", width: "initial", background: "black", color: "white", padding: "0.5rem", borderRadius: "7px" }}
            onClick={(e) => submit(e)} />
        </div>
      </div>
      <h3 style={{ textAlign: "center", marginTop: "1rem" }}>Preview</h3>
      <div>
        <Row style={{ margin: '2rem' }}>
          <Col md={6}>
            <Image src={product.image} alt={product.name} style={{ position: 'relative', maxWidth: '100%', height: 'auto' }} />
          </Col>
          <Col md={3} >
            <ListGroup variant='flush' >
              <ListGroup.Item><h3>{product.item_name}</h3> </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price} </ListGroup.Item>
              <ListGroup.Item>{product.description} </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card style={{ margin: '2rem' }}>
              <ListGroup variant='flush' >
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col><srong> $ {product.price} </srong></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col> <srong> {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'} </srong> </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {/* <Button className='btn-block'
              type='button'
              disabled={product.countInStock == 0} >
            Add To Cart
            </Button> */}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default StoreItemEdit
