import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import "../index.css";
import Sidebar from './Sidebar';
import genreMapping from '../Helpers/GenreMapping';

export default function FetchRequest() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  useEffect(() => {
    fetch('https://podcast-api.netlify.app')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Sidebar />
      <div className="main-content">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!error && data && (
          <>
            <div className="preview-background" style={{ backgroundImage: hoveredItem ? `url(${hoveredItem.image})` : 'none' }}>
            </div>
            <div className="list-items">
              <ul>
                {data.map(post => (
                  <li key={post.id} onMouseEnter={() => setHoveredItem(post)} onMouseLeave={() => setHoveredItem(null)}>
                    <h5>{post.title}</h5>
                    <p>{post.body}</p>
                    {post.image && <img src={post.image} alt={post.title} />}
                    <p>Genre: {genreMapping[post.genre_id]}</p> 
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}