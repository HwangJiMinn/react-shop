import React, { useState, useEffect } from 'react';
import styles from './EventBanner.module.css';
import { useNavigate } from 'react-router-dom';

const EventBanner = ({ slides, onCategoryClick }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigate = useNavigate();

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
    onCategoryClick(category);
  };

  return (
    <div className={styles.eventBannerContainer}>
      {slides.map((slide, index) => (
        <div key={index} className={styles.slide} style={{ display: index === currentSlideIndex ? 'block' : 'none' }}>
          <img src={slide.imageUrl} alt={slide.description} className={styles.slideImage} />
          <div className={styles.slideContent}>
            <h2 className={styles.slideDescription}>{slide.title}</h2>
            <div className={styles.description}>{slide.description}</div>
            <div className={styles.slideButton} onClick={() => handleCategoryClick(slide.category)}>바로가기 -&gt;</div>
          </div>
        </div>
      ))}
      <button className={styles.prevButton} onClick={handlePrevSlide}>
        &#10094;
      </button>
      <button className={styles.nextButton} onClick={handleNextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default EventBanner;