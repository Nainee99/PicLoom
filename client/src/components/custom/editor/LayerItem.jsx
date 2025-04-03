"use client";

import { Type, ImageIcon, Square } from "lucide-react";

const LayerItem = ({ type, label, isSelected, onClick }) => {
  const getIcon = () => {
    switch (type) {
      case "text":
        return <Type className="h-5 w-5 text-gray-500" />;
      case "image":
        return <ImageIcon className="h-5 w-5 text-gray-500" />;
      case "canvas":
        return <Square className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <button
      className={`flex items-center w-full p-3 rounded-md text-left transition-colors ${
        isSelected ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center mr-3">
        {getIcon()}
      </div>
      <span>{label}</span>
    </button>
  );
};

export default LayerItem;
