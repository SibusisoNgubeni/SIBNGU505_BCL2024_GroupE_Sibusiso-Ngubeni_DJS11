import React, { useState, useEffect, useCallback } from 'react';

const colors = {
  day: {
    background: '#f0f0f0',
    navbar: '#c4d0cf',
    modal: '#ffffff', 
    logo: "./Assets/images/badpodcast-darkbg.png"
    
  },
  night: {
    background: '#333',
    navbar: '#3e3d3d',
    modal: '#444444', 
    logo: "./Assets/images/badpodcast-lightbg.png"
  },
};

const initializeTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'night' : 'day';
};

const initialTheme = initializeTheme();
document.documentElement.style.setProperty('--background-color', colors[initialTheme].background);
document.documentElement.style.setProperty('--navbar-color', colors[initialTheme].navbar);
document.documentElement.style.setProperty('--modal-color', colors[initialTheme].modal);

export default function Themes() {
  const [theme, setTheme] = useState(initialTheme);
  const [logo, setLogo] = useState(colors[initialTheme].logo);

  const updateColors = (newTheme) => {
    document.documentElement.style.setProperty('--background-color', colors[newTheme].background);
    document.documentElement.style.setProperty('--navbar-color', colors[newTheme].navbar);
    document.documentElement.style.setProperty('--modal-color', colors[newTheme].modal);
    setLogo(colors[newTheme].logo);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    updateColors(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleMediaQueryChange = useCallback(() => {
    const newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
    handleThemeChange(newTheme);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [handleMediaQueryChange]);

  return (
    <div>
      <select value={theme} onChange={(e) => handleThemeChange(e.target.value)}>
        <option value="day">Day</option>
        <option value="night">Night</option>
       
      </select>
      <img src={logo} alt="Logo" style={{ height: '50px' }} />
    </div>
  );
}