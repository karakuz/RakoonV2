import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Axios from 'axios'
const SearchBar = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        const res = await Axios({
            method: "POST",
            withCredentials: true,
            url: `http://localhost:4000/search/${keyword}`,
        });
        console.log(res.data);
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button style={{ margin: '1rem' }} type='submit' varient='outline-success' className='p-2'>Search</Button>
        </Form>
    )
}

export default SearchBar
