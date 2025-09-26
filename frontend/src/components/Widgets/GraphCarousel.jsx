import React, { useState, useEffect } from "react";
import Graph from "./Graph";

const GraphCarousel = ({ data }) => { // Dashboard.jsx passe les données à GraphCarousel
    const types = ["température", "humidité", "co2"];
    cosnt [c]