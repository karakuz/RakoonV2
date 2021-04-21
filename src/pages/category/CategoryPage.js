import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import ProductCard from '../../components/product/product_card';
import { useParams } from 'react-router-dom'
import '../css/bootstrap.min.css';
import { Col, Row, Container } from 'react-bootstrap';

const CategoryPage = (props) => {
    const [products, setProducts] = useState([]);
    //const ref = useRef(false);
    const { name } = useParams();

    console.log("Body");
    const getProducts = async () => {
        const res = await Axios({
            method: "GET",
            withCredentials: true,
            url: `http://localhost:4000/category/${name}`,
        });
        setProducts(res.data)
    };

    useEffect(() => {
        getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h3 style={{ textAlign: 'center', margin: '1rem' }}>
                Welcome to Rakoon E-Commerce!
      </h3>
            <Container>
                <Row>
                    {
                        products.map((product) => {
                            return (
                                <Col sm={12} md={6} lg={4} xl={3}>
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

export default CategoryPage;