"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

const ColorPicker = ({
  selectedColor,
  onColorChange,
  showHexInput = false,
}) => {
  const [inputColor, setInputColor] = useState(selectedColor);

  const handleInputChange = (e) => {
    setInputColor(e.target.value);
  };

  const handleInputBlur = () => {
    onColorChange(inputColor);
  };

  const colorOptions = [
    // White to pink row
    "#FFFFFF",
    "#F5F5F5",
    "#FFEBEE",
    "#FFF8E1",
    "#F1F8E9",
    "#E0F7FA",
    "#E8EAF6",
    "#FCE4EC",
    // Red to pink row
    "#FF5252",
    "#FF9800",
    "#FFEB3B",
    "#8BC34A",
    "#00BCD4",
    "#3F51B5",
    "#9C27B0",
    "#E91E63",
    // Dark red to purple row
    "#B71C1C",
    "#E65100",
    "#827717",
    "#1B5E20",
    "#006064",
    "#1A237E",
    "#4A148C",
    "#880E4F",
    // Dark colors row
    "#4E342E",
    "#BF360C",
    "#F57F17",
    "#33691E",
    "#004D40",
    "#0D47A1",
    "#311B92",
    "#000000",
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-8 gap-2">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            className={`w-6 h-6 rounded-full border ${
              selectedColor === color
                ? "ring-2 ring-offset-2 ring-blue-500"
                : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>

      {showHexInput && (
        <div className="flex items-center mt-2">
          <Input
            value={inputColor}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="font-mono"
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
