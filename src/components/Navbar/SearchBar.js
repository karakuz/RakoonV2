import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBar = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        history.push(`/search/${keyword}`);
      }

    return (
        <Form onSubmit={e => submitHandler(e)} inline>
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
