import React, { useState } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

const Banner = () => {
  const data = [
    "https://amazonproone.vercel.app/static/media/img2.bc1bdb910ead16c65197.jpg",
    "https://amazonproone.vercel.app/static/media/img5.aa945e25375bfdee385f.jpg",
    "https://amazonproone.vercel.app/static/media/img3.c80809bb40bee5c34372.jpg",
    "https://amazonproone.vercel.app/static/media/img1.efb3d39101f7ef77d616.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  return (
    <div className="w-full h-auto overflow-x-hidden relative">
      <div className="w-screen h-[650px] relative">
        <div className="w-full h-full flex" style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.3s ease-in-out' }}>
          {data.map((image, index) => (
            <img
              key={index}
              className="w-screen h-full object-cover"
              src={image}
              alt={`Img ${index + 1}`}
              loading="priority"
            />
          ))}
        </div>
        <div className="absolute left-0 right-0 mx-auto flex gap-8 bottom-44">
          <div onClick={prevSlide}>
            <HiArrowLeft />
          </div>
          <div onClick={nextSlide}>
            <HiArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
