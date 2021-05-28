import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import ProductCard from '../../components/product/product_card';
import '../css/bootstrap.min.css';
import { Col, Row, Container } from 'react-bootstrap';


const Body = (props) => {
  const [products, setProducts] = useState([]);
  const [min, setMin] = React.useState();
  const [max, setMax] = React.useState();
  var url = process.env.NODE_ENV === "production" ? "https://rakoon-v-2-kbmgw.ondigitalocean.app" : "http://localhost:4000";
  const getProducts = async () => {
    const res = await Axios({
      method: "GET",
      withCredentials: true,
      url: `${url}/products`,
    });
    setProducts(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const find = () => {
    if (max !== null && min != null)
      setProducts(products.filter(product => product.price < max && product.price > min))
  }

  const [orderState, setOrderState] = useState("NameAsc");

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

      <div className="container p-5">
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
          <label>Price</label>
          <br></br>
          <input id="min" type="number" onChange={(e) => setMin(parseInt(e.target.value))} />
          <input id="max" type="number" onChange={(e) => setMax(parseInt(e.target.value))} />

          <input type="button" onClick={() => find()} value="Filter" />
        </div>
      </div>



      <Container>
        <Row>
          {
            products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product.item_id}>
                  <ProductCard key={product.item_id} id={product.item_id} {...product}
                    numOfItems={props.numOfItems} setNumOfItems={props.setNumOfItems} />
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