import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="Home">
      <h1>home</h1>
      <Link to="/post">Create questionnaire</Link>
    </div>
  );
};;

export default Home;
