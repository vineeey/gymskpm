import React from 'react';

const BackgroundSlideshow = () => {
  return (
    <>
      <div className="bg-dark-overlay"></div>
      <ul className="cb-slideshow">
        {Array.from({ length: 20 }, (_, index) => (
          <li key={index}>
            <span></span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BackgroundSlideshow;