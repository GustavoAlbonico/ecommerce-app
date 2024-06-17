import React, { useEffect, useState } from "react";
import "./index.css";

const images = [
  {
    label: 'exemplo 1',
    imgPath: '/Qu4to2-scaled.png',
  },
  {
    label: 'exemplo 2',
    imgPath: '/infiltrados-scaled.png',
  },
  {
    label: 'exemplo 2',
    imgPath: '/Matryoshka-scaled.png',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            className={`carousel-item ${index === currentIndex ? "active" : ""}`}
            key={index}
          >
            <img src={image.imgPath} alt={image.label} />
          </div>
        ))}
      </div>
      <button className="carousel-control prev" onClick={handlePrev}>
        &#10094;
      </button>
      <button className="carousel-control next" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
