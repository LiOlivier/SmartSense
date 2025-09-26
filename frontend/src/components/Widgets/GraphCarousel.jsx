import React, { useState, useEffect } from "react";
import Graph from "./Graph";

const GraphCarousel = ({ data }) => { // Dashboard.jsx passe les données à GraphCarousel
    const types = ["température", "humidité", "co2"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect( () => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % types.length);
        }, 4000); // 4 secondes
        return () => clearInterval(interval);
    }, []);

  return (
    <div className="graph-carousel">
      <div className={'graph-slide ${animating ? "animating" : ""}'}>
        <Graph data={data} type={types[currentIndex]} />
      </div>

      <div className="carousel-dots">
        {types.map((_, idx) => (
          <span
            key={idx}
            className={'dot ${idx === currentIndex ? "active" : ""}'}
            onClick={() => setCurrentIndex(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default GraphCarousel