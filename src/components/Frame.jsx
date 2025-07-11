import React from 'react';
import '../components/frame.css'; 

function Frame({ children }) {
  return (
    <div className="app-frame-wrapper">
      <div className="app-frame">
        {children}
      </div>
    </div>
  );
}

export default Frame;

