// Sidebar.js
import React, { useState } from 'react';
import '../index.css'

export default function Sidebar() {
  



  return (
    <div className='sidebar'>
    <div>
      
    <h2>Genres</h2>
    </div>
    
   
    <ul>
      <li>Comedy</li>
      <li>Technology</li>
      <li>Sports</li>
      <li>News</li>
      <li>Music</li>
    </ul>
    <h2>New Podcasts</h2>
    <ul>
      <li>Podcast 1</li>
      <li>Podcast 2</li>
      <li>Podcast 3</li>
      <li>Podcast 4</li>
    </ul>
   
  </div>
  );
}