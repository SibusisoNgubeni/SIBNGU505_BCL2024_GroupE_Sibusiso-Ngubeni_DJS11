import React, { useState, useEffect } from 'react';
import "../index.css";
import Sidebar from './Sidebar';
import genreMapping from '../Helpers/GenreMapping';
import TruncateText from '../Helpers/TruncateText';

export default function FetchRequest() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setData(sortedData);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setHoveredItem(null); // Reset hovered item when genre changes
  };

  const handleMouseEnter = (post) => {
    setHoveredItem(post);
  };

 

  const filteredData = selectedGenre
    ? data.filter(post => post.genres.some(genreId => genreMapping[genreId] === selectedGenre))
    : data;

  const uniqueGenres = [
    ...new Set(data.flatMap(post => post.genres.map(genreId => genreMapping[genreId])))
  ];

  // Dummy data for "My List" (played shows)
  const myList = [
    {
      id: 1,
      title: 'Played Show 1',
      image: 'https://example.com/played-show-1.jpg',
      description: 'Description of Played Show 1...',
      seasons: 2,
      genres: ['comedy', 'fiction'],
      updated: '2024-06-20'
    },
    {
      id: 2,
      title: 'Played Show 2',
      image: 'https://example.com/played-show-2.jpg',
      description: 'Description of Played Show 2...',
      seasons: 1,
      genres: ['news'],
      updated: '2024-06-19'
    }
  ];

  return (
    <div className="container">
      <Sidebar genres={uniqueGenres} onGenreSelect={handleGenreSelect} />
      <div className="main-content">
        {loading && <p className='loading-sts'></p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!error && filteredData.length > 0 && (
          <>
            {/* Preview Background and Details */}
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
      
            {/* Main List of Podcasts */}
            <div className="list-items">
              <h2>{selectedGenre ? `${selectedGenre}` : 'All Shows'}</h2>
              <ul className="horizontal-scroll">
                {filteredData.map(post => (
                  <li key={post.id} onMouseEnter={() => handleMouseEnter(post)}>
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
