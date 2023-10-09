import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageSlider = ({ images }) => {
  const imageStyle = {
    maxHeight: '500px', // Adjust this value to decrease or increase the height
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 2000); 

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <Carousel
      selectedItem={currentSlide}
      onChange={handleSlideChange}
      autoPlay
      infiniteLoop
      interval={9999999} // Set a very high interval to prevent auto sliding by the carousel itself
      showThumbs={false} 
    >
      {images.map((image, index) => (
        <div key={index}>
          {/* Apply the custom style to the images */}
          <img src={image} alt={`Slide ${index}`} style={imageStyle} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
