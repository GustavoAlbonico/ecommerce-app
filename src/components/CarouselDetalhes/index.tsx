import React, { useEffect, useState } from "react";
import "./index.css";

const images = [
  {
    label: 'exemplo 1',
    imgPath: 'produtos/Matryoshka-caixa.png',
  },
  {
    label: 'exemplo 2',
    imgPath: 'produtos/Matryoska-Cartas.png',
  },
  {
    label: 'exemplo 2',
    imgPath: 'produtos/Matryoshka-caixa.png',
  },
];

const CarouselDetalhes = () => {
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

export default CarouselDetalhes;
