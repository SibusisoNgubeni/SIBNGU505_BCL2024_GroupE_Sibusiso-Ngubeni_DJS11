import React, { useState, useEffect, useRef } from 'react';
import "../index.css";
import Sidebar from './Sidebar';
import genreMapping from '../Helpers/GenreMapping';
import TruncateText from '../Helpers/TruncateText';
import ScrollArrows from './ScrollArrow';

export default function FetchRequest() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

  const listRef = useRef(null);

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

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: -200, // Adjust as needed based on the scroll distance
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 200, // Adjust as needed based on the scroll distance
        behavior: 'smooth',
      });
    }
  };

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
            <ScrollArrows scrollLeft={scrollLeft} scrollRight={scrollRight} /> {/* Use the ScrollArrows component */}
              <ul ref={listRef}>
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
