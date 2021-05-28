import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../../pages/css/navSearch.css';

const SearchBar = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        history.push(`/search/${keyword}`);
      }

    return (
      <Form onSubmit={e => submitHandler(e)} inline className="searchForm">
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
          className='mr-sm-2 ml-sm-5 searchInput'
        ></Form.Control>
        <Button style={{ margin: '1rem' }} type='submit' varient='outline-success' className='p-2 searchButton'>Search</Button>
      </Form>
    )
}

export default SearchBar
