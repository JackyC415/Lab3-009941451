import React from 'react';
import { Link } from 'react-router-dom';

const Posts = ({ posts }) => {

  return (
    <ul className='list-group mb-4'>
      {posts.map(post => (
        <li key={post.id} className='list-group-item'>
           <div><Link to="/addToCart">{post.restaurant_name}</Link></div>
        </li>
      ))}
    </ul>
  );
};

export default Posts;