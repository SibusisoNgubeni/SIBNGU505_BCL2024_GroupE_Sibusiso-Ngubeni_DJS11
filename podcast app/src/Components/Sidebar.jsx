// Sidebar.js
import React from 'react';
import '../index.css';

export default function Sidebar({ genres, onGenreSelect, onSort }) {


  
  return (
    <div className='sidebar'>
      <div>
        <h2>Genres</h2>
      </div>
    
      <div className="sort-options">
        <button onClick={() => onSort('asc')}>Sort A-Z</button>
        <button onClick={() => onSort('desc')}>Sort Z-A</button>
      </div>
      
    </div>
  );
}
