"use client";

import { useEffect, useState } from "react";

const cities = ["Vancouver", "Surrey", "Burnaby", "Richmond", "Coquitlam", "Delta"];

export default function RotatingCityText() {
  const [currentCity, setCurrentCity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCity((prev) => (prev + 1) % cities.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return <span>{cities[currentCity]}</span>;
}

