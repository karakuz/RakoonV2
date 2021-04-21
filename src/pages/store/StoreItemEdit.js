import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import Axios from 'axios';
import '../css/store.css';
import StoreNav from './StoreNav';

const StoreItemEdit = () => {
  const { item_id } = useParams();
  const [product, setProduct] = useState([]);  
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

  const getProduct = async () =>{
    const res = await Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/product/${item_id}`,
    });
    console.log(res.data);
    setProduct(res.data);
    console.log(product);
  }

  useEffect(() => {
    getCategories();
    getProduct();
  }, []);

  const submit = () => {

  }

  return (
    <div style={{margin:"2em", display: "flex", flexDirection:"column"}}>
      <StoreNav/>
      <h3 style={{textAlign: "center"}}>Item Edit</h3>
      <div style={{margin:"2em auto", display: "inline-flex", flexDirection:"column", fontSize: "1.3rem", width:"430px"}} id="add">
        <div>
          <label>Name:</label>
          <input type="text" onChange={(e)=> setItemName(e.target.value)} value={product.item_name}/>
        </div>
        <div>
          <label>Description:</label>
          <textarea rows="5" cols="23" onChange={(e)=> setDescription(e.target.value)} value={product.description}></textarea>
        </div>
        <div>
          <label>Price:</label>
          <input type="text" onChange={(e)=> setPrice(e.target.value)} value={product.price}/>
        </div>
        <div style={{position: "relative"}}>
          <label>Image:</label>
          <input name="file" type="file" style={{position: "absolute", right: "0"}}/>
          {/* <input type="file" style={{position: "absolute", right: "0"}}/> */}
        </div>
        <div>
          <label>Category</label>
          <select name="categories" id="categories" onChange={(e)=> setCategory(e.target.value)} value={product.category}>
            {
              categories.map( category => {
                return <option value={category.category}>{category.category}</option>
              })
            }
          </select>
        </div>
        <div>
          <label>Count</label>
          <input type="number" min="1" onChange={(e)=> setCount(e.target.value)} value={product.countInStock}/>
        </div>
        <div>
          <label>Brand</label>
          <input type="text" onChange={(e)=> setBrand(e.target.value)} value={product.brand}/>
        </div>
        <div style={{display: "flex", marginTop:"1rem"}}>
          <input type="submit" value="Update" style={{margin: "0 auto", width: "initial", background: "black", color: "white", padding: "0.5rem", borderRadius: "7px"}} 
            onClick={(e)=> submit(e)}/>
        </div>
      </div>
      <h3 style={{textAlign: "center", marginTop: "1rem"}}>Preview</h3>
      <div>
      <Row style={{ margin: '2rem' }}>
        <Col md={6}>
          <Image src={product.image} alt={product.name} style={{ position: 'relative', maxWidth: '100%', height: 'auto' }} />
        </Col>
        <Col md={3} >
          <ListGroup variant='flush' >
            <ListGroup.Item><h3>{product.item_name}</h3> </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price} </ListGroup.Item>
            <ListGroup.Item>Description: {product.description} </ListGroup.Item>
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
