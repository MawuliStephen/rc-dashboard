import React, { useState, useEffect } from 'react';

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSwipeInterval, setAutoSwipeInterval] = useState(null);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === children.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 3000); // Auto-swipe interval: 3 seconds
    setAutoSwipeInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (autoSwipeInterval) {
      clearInterval(autoSwipeInterval);
      const interval = setInterval(goToNextSlide, 3000); // Restart auto-swipe interval on slide change
      setAutoSwipeInterval(interval);
    }
  }, [currentIndex]);

  return (
    <div className="carousel">
      <div className="carousel-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {children}
      </div>
      <button className="prev" onClick={goToPrevSlide}>&#10094;</button>
      <button className="next" onClick={goToNextSlide}>&#10095;</button>

    </div>
  );
};

export default Carousel;




// import React, { useState } from 'react';

// const Carousel = ({ children }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const goToNextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === children.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const goToPrevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? children.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="carousel">
//       <div className="carousel-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//         {children}
//       </div>
//       <button className="prev" onClick={goToPrevSlide}>&#10094;</button>
//       <button className="next" onClick={goToNextSlide}>&#10095;</button>
//       <style jsx>{`
//         .carousel {
//           position: relative;
//           overflow: hidden;
//         }

//         .carousel-wrapper {
//           display: flex;
//           transition: transform 0.5s ease;
//         }

//         .prev,
//         .next {
//           position: absolute;
//           top: 50%;
//           transform: translateY(-50%);
//           background-color: rgba(0, 0, 0, 0.5);
//           color: white;
//           border: none;
//           padding: 10px;
//           cursor: pointer;
//         }

//         .prev {
//           left: 0;
//         }

//         .next {
//           right: 0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Carousel;
