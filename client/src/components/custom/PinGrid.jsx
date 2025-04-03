"use client";

import { useEffect, useState } from "react";
import { generatePins } from "@/lib/data";
import PinCard from "./PinCard";

export default function PinGrid() {
  const [pins, setPins] = useState([]);
  const [columns, setColumns] = useState(5);

  useEffect(() => {
    // Generate some random pins
    setPins(generatePins(50));

    // Handle responsive columns
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(2);
      else if (width < 768) setColumns(3);
      else if (width < 1024) setColumns(4);
      else setColumns(5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Distribute pins into columns (Pinterest-style masonry layout)
  const getColumnPins = () => {
    const columnPins = Array.from({ length: columns }, () => []);

    pins.forEach((pin, index) => {
      const columnIndex = index % columns;
      columnPins[columnIndex].push(pin);
    });

    return columnPins;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {getColumnPins().map((columnPins, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          {columnPins.map((pin) => (
            <PinCard key={pin.id} pin={pin} />
          ))}
        </div>
      ))}
    </div>
  );
}
