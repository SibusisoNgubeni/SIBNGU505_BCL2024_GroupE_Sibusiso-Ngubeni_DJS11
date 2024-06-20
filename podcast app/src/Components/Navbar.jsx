import React, { useState, useEffect } from 'react';
import '../index.css';
import SettingsModal from './SettingsModal';

export default function Navbar({ podcasts, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = podcasts
        .filter(podcast => podcast.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(podcast => podcast.title);
      setSuggestions(filteredSuggestions);
    }
  }, [searchQuery, podcasts]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100); // Delay to allow click event
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="Navbar">
      <div>
        <img className="logoimg" src="./src/assets/images/badpodcast-darkbg.png" alt="Logo" />
      </div>
      <div className="search-bar" onBlur={handleBlur} onFocus={handleFocus} onMouseLeave={() => setShowSuggestions(false)}>
        <input
          type="text"
          placeholder="Search podcasts..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        {searchQuery && showSuggestions && suggestions.length === 0 && (
          <div className="no-results">No results found</div>
        )}
      </div>
      <SettingsModal />
    </div>
  );
}
