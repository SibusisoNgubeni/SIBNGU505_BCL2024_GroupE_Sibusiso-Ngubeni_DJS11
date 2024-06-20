import React, { useState } from 'react';
import '../index.css';
import SettingsModal from './SettingsModal';

export default function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="Navbar">
      <div>
        <img className="logoimg" src="./src/assets/images/badpodcast-darkbg.png" alt="Logo" />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search podcasts..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <SettingsModal />
    </div>
  );
}
