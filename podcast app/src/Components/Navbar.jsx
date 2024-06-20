import React, { useState } from 'react';
import '../index.css';
import SettingsModal from './SettingsModal';

export default function Navbar() {


  return (
    <div className="Navbar">
      
        <div>
          <img className="logoimg"src="./src/assets/images/badpodcast-darkbg.png"/>
        </div>
      
      
       
        <SettingsModal/>
       
      
    </div>
  );
}