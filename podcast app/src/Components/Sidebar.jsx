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
      <li>Business</li>
      <li>Comedy</li>
      <li>Entertainment</li>
      <li>Fiction</li>
      <li>History</li>
      <li>Investigative Journalism</li>
      <li>Kids And Family</li>
      <li>News</li>
      <li>Personal Growth</li>

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