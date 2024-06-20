import React, { useState } from 'react';
import '../index.css';
import SettingsModal from './SettingsModal';

export default function Navbar() {


  return (
    <div className="Navbar">
      
        <div>
          <h1>Bad Podcast</h1>
        </div>
      
      
       
        <SettingsModal/>
       
      
    </div>
  );
}