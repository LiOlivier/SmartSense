import React, { useState, useEffect } from "react";
import Graph from "./Graph";

const GraphCarousel = ({ data }) => { // Dashboard.jsx passe les données à GraphCarousel
    const types = ["température", "humidité", "co2"];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect( () => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % types.length);
        }, 4000); // 4 secondes
        return () => clearInterval(interval);
    }, []);

    return (
        <div className = "graph-carrousel">
            <Graph data={data} type={types[currentIndex]} />
        </div>
    );
};

export default GraphCarousel