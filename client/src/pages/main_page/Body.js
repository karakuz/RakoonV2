import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import ProductCard from '../../components/product/product_card';
import '../css/bootstrap.min.css';
import { Col, Row, Container, Form } from 'react-bootstrap';
import '../css/body.css'

const Body = (props) => {
  const [products, setProducts] = useState([]);
  const [min, setMin] = React.useState();
  const [max, setMax] = React.useState();
  const [storeNames, setStoreNames] = useState([]);
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  const getProducts = async () => {
    const res = await Axios({
      method: "GET",
      withCredentials: true,
      url: `${url}/products`,
    });
    setProducts(res.data);
  };
  const getStoreNames = async () => {
    const res = await Axios({
      method: "POST",
      withCredentials: true,
      data: {
        category: "all"
      },
      url: `${url}/store/storenames`
    });
    console.log(res.data);
    setStoreNames(res.data);
  }

  useEffect(() => {
    getProducts();
    getStoreNames();
  }, []);

  const [color, setColor] = React.useState();
  const filterColor = () => {
    setProducts(products.filter(product => product.color == "Black"))
  }
  
  const find = () => {
    if (max !== null && min != null)
      setProducts(products.filter(product => product.price < max && product.price > min))
  }

  const [orderState, setOrderState] = useState("NameAsc");
  const [colorState, setColorState] = useState("White");

  const sortAsc = sortBy => (a, b) => {
    if (a[sortBy] > b[sortBy]) {
      return 1;
    } else if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    return 0;
  }


  const sortDesc = sortBy => (a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return 1;
    } else if (a[sortBy] > b[sortBy]) {
      return -1;
    }
    return 0;
  }

  const order = () => {
    console.log(orderState);
    if (orderState == "NameAsc")
      products.sort(sortAsc('item_name'));
    else if (orderState == "NameDesc")
      products.sort(sortDesc('item_name'));
    else if (orderState == "PriceAsc")
      products.sort(sortAsc('price'));
    else if (orderState == "PriceDesc")
      products.sort(sortDesc('price'));
  }

  return (
    <div>
      <h3 style={{ textAlign: 'center', margin: '1rem' }}>
        Welcome to Rakoon E-Commerce!
      </h3>
      {/* <Filter products={products}/> */}
      <div className="filter">
        <div class="row">
          <div style={{ marginBottom: "1rem" }}>
            <Form.Control as="select" defaultValue="Select">
              <option>Price</option>
              <option>0-$50</option>
              <option>$50-$200</option>
              <option>$200-$500</option>
              <option>+$500</option>
            </Form.Control>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <Form.Control as="select" defaultValue="Select">
              <option>Store</option>
              {
                storeNames.map((store) => {
                  console.log(store);
                  return <option>{store.store_name}</option>
                })
              }
            </Form.Control>
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <select
            className="custom-select"
            value={color}
            onChange={(e) => {
              const selectedColor = e.target.value;
              setColorState(selectedColor);
              filterColor();
            }}
          >
            <option value="Red">Red</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Mixed">Blue</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>


        <div style={{ marginBottom: "1rem" }}>
          <select
            className="custom-select"
            value={orderState}
            onChange={(e) => {
              const selectedOrder = e.target.value;
              setOrderState(selectedOrder);
              order();
            }}
          >
            <option value="NameAsc">Order by Name Z-A</option>
            <option value="NameDesc">Order by Name A-Z</option>
            <option value="PriceAsc">Order by Price(Descending)</option>
            <option value="PriceDesc">Order by Price(Ascending)</option>
          </select>
        </div>

        <div className="container p-1">
          <div className="form-group">
            <label style={{ display: "block", textAlign: "center" }}>Price</label>
            <div className="bodyPriceFilter">
              <input id="min" type="number" onChange={(e) => setMin(parseInt(e.target.value))} className="minPrice" />
              <input id="max" type="number" onChange={(e) => setMax(parseInt(e.target.value))} className="maxPrice" />
            </div>
            <div>
            <input type="button" onClick={() => find()} value="Filter"
              style={{
                display: "inline-block",
                margin: "1rem auto 0",
                padding: "11px",
                fontSize: "18px",
                color: "white",
                backgroundColor: "black"
              }} />
              <input type="button" onClick={() => getProducts()} value="Reset"
              style={{
                display: "inline-block",
                margin: "1rem auto 0",
                padding: "11px",
                fontSize: "18px",
                color: "white",
                backgroundColor: "black"
              }} />

            </div>
            
          </div>
        </div>
      </div>

      <Container>
        <Row>
          {
            products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product.item_id}>
                  <ProductCard key={product.item_id} id={product.item_id} {...product}
                    numOfItems={props.numOfItems} setNumOfItems={props.setNumOfItems} isRemovable={false} />
                </Col>
              );
            })
          }
        </Row>
      </Container>
    </div>
  )
}

export default Body