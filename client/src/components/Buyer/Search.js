//References: https://github.com/bradtraversy/simple_react_pagination

import React, {useState} from 'react';
import Posts from './Posts';
import Pagination from './Pagination';
import axios from 'axios';
import { MDBCol, MDBIcon } from "mdbreact";

const Search = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [item, setItem] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [display, setDisplay] = useState(false);

  const getRestaurants = async (e) => {
    e.preventDefault();
    const res = await axios.post('/getRestaurants', { item: item });
    setPosts(res.data);
    setDisplay(true);
  };

  const filterByCuisine = async (e) => {
    console.log(cuisine);
    e.preventDefault();
    const res = await axios.post('/filterByCuisine', { cuisine: cuisine });
    setPosts(res.data);
    setDisplay(true);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  let searchResult = null;
  if (display) {
    searchResult = <div>
      <input type="text" placeholder="filter by cuisine" value={cuisine} onChange={e => setCuisine(e.target.value)}/>  
      <button onClick={filterByCuisine}>Filter</button>
      <h1 className='text-primary mb-3'>Restaurants</h1>
      <Posts posts={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      /></div>
  }
  return (
    <div className='container mt-5'>
      <h1>Buyer Homepage</h1>
      <MDBCol md="6">
        <form className="form-inline mt-4 mb-4" onSubmit={getRestaurants}>
          <MDBIcon icon="search" />
          <input className="form-control form-control-sm ml-3 w-75"
            type="text"
            placeholder="Search menu item"
            aria-label="Search"
            name="item"
            value={item}
            onChange={e => setItem(e.target.value)}
            required />
        </form>
      </MDBCol>
      {searchResult}
    </div>
  );
};

export default Search;