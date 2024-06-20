// ScrollArrows.js
import React from 'react';
import '../styles/ScrollArrows.css'; 

export default function ScrollArrows({ scrollLeft, scrollRight }) {
  return (
    <div className="scroll-arrows">
      <button onClick={scrollLeft}>&#8249;</button> {/* Left arrow */}
      <button onClick={scrollRight}>&#8250;</button> {/* Right arrow */}
    </div>
  );
}
