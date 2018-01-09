import React from 'react';
import { Link } from 'react-router-dom';

export default function() {
  return (
    <div>
      <Link to="/create-session">Auth page</Link><br/>
      <Link to="/table">Table page</Link>
      <h2>Page is not found!</h2>
    </div>
  )
}