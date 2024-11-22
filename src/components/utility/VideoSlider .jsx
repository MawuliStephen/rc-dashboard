// VideoSlider.js
import React, { useState } from 'react';
import '../../css/videoslider.css'; // Import the CSS for styling

const VideoSlider = ({ videos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? videos.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="slider-container">
            <button className="prev vbutton" onClick={prevSlide}>
                &#10094;
            </button>
            <div className="slider">
                <video width="100%" height="auto" controls>
                    <source src={videos[currentIndex]} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <button className="next" onClick={nextSlide}>
                &#10095;
            </button>
        </div>
    );
};

export default VideoSlider;
