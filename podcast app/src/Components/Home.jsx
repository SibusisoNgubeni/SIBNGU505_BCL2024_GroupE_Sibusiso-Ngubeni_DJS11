import React, { useState, useEffect } from 'react';
import "../index.css";
import Sidebar from './Sidebar';
import genreMapping from '../Helpers/GenreMapping';
import TruncateText from '../Helpers/TruncateText'; // Ensure this component exists and is imported correctly

export default function FetchRequest() {
  const [data, setData] = useState([]);
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
      <Sidebar />
      <div className="main-content">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!error && data.length > 0 && (
          <>
            <div className="preview-background" style={{ backgroundImage: hoveredItem ? `url(${hoveredItem.image})` : 'none' }}>
              {hoveredItem && (
                <div className="hover-details">
                  <h5>{hoveredItem.title}</h5>
                  <TruncateText text={hoveredItem.description} maxLength={250} />
                  <p>Seasons: {hoveredItem.seasons}</p>
                  <p>{hoveredItem.genres.map(genreId => genreMapping[genreId]).join(', ')}</p>
                  <p>Last Updated: {new Date(hoveredItem.updated).toLocaleDateString()}</p>
                </div>
              )}
            </div>
            <div className="list-items">
              <ul>
                {data.map(post => (
                  <li key={post.id} onMouseEnter={() => setHoveredItem(post)} onMouseLeave={() => setHoveredItem(null)}>
                    {post.image && <img src={post.image} alt={post.title} />}
                    <div className="text-content">
                      <h5>{post.title}</h5>
                    </div>
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
