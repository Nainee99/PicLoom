"use client";

import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import LayerItem from "@/components/custom/editor/LayerItem";
import TextSettings from "@/components/custom/editor/TextSettings";
import ImageSettings from "@/components/custom/editor/ImageSettings";
import CanvasSettings from "@/components/custom/editor/CanvasSettings";

const ImageEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState("image");
  const [editorState, setEditorState] = useState({
    orientation: "portrait",
    aspectRatio: "original",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    fontSize: 36,
    fontFamily: "Superglue",
    textAlignment: "center",
    text: "Add text",
    textHighlight: false,
    characterCount: 0,
  });

  useEffect(() => {
    // Get image from location state or redirect back to form
    if (location.state?.image) {
      const url = URL.createObjectURL(location.state.image);
      setImage(url);
      setEditedImage(location.state.image);
    } else {
      navigate("/create-pin/form");
    }

    // Cleanup URL on unmount
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [location.state, navigate]);

  const handleDone = () => {
    // Navigate back to form with edited image
    navigate("/create-pin/form", {
      state: {
        editedImage: editedImage,
        editorState: editorState,
      },
    });
  };

  const handleLayerSelect = (layer) => {
    setSelectedLayer(layer);
  };

  const handleReplaceImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (image) URL.revokeObjectURL(image);
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImage(url);
      setEditedImage(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const updateEditorState = (updates) => {
    setEditorState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Calculate canvas dimensions based on orientation and aspect ratio
  const getCanvasDimensions = () => {
    const baseWidth = 400;
    const baseHeight = 600;

    if (editorState.orientation === "portrait") {
      switch (editorState.aspectRatio) {
        case "1:2":
          return { width: baseWidth, height: baseWidth * 2 };
        case "9:16":
          return { width: baseWidth, height: Math.round((baseWidth * 16) / 9) };
        case "2:3":
          return { width: baseWidth, height: Math.round((baseWidth * 3) / 2) };
        case "3:4":
          return { width: baseWidth, height: Math.round((baseWidth * 4) / 3) };
        case "4:5":
          return { width: baseWidth, height: Math.round((baseWidth * 5) / 4) };
        case "1:1":
          return { width: baseWidth, height: baseWidth };
        default:
          return { width: baseWidth, height: baseHeight }; // original
      }
    } else {
      // Landscape orientation
      switch (editorState.aspectRatio) {
        case "1:2":
          return { width: baseHeight, height: baseHeight / 2 };
        case "9:16":
          return {
            width: Math.round((baseHeight * 16) / 9),
            height: baseHeight,
          };
        case "2:3":
          return {
            width: Math.round((baseHeight * 3) / 2),
            height: baseHeight,
          };
        case "3:4":
          return {
            width: Math.round((baseHeight * 4) / 3),
            height: baseHeight,
          };
        case "4:5":
          return {
            width: Math.round((baseHeight * 5) / 4),
            height: baseHeight,
          };
        case "1:1":
          return { width: baseHeight, height: baseHeight };
        default:
          return { width: baseHeight, height: baseWidth }; // original
      }
    }
  };

  // Determine which settings to show based on selected layer
  const renderSettings = () => {
    switch (selectedLayer) {
      case "text":
        return (
          <TextSettings
            editorState={editorState}
            updateEditorState={updateEditorState}
          />
        );
      case "image":
        return (
          <ImageSettings
            editorState={editorState}
            updateEditorState={updateEditorState}
            image={image}
            onReplaceClick={triggerFileInput}
          />
        );
      case "canvas":
        return (
          <CanvasSettings
            editorState={editorState}
            updateEditorState={updateEditorState}
          />
        );
      default:
        return null;
    }
  };

  const dimensions = getCanvasDimensions();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/create-pin/form")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Design your Pin</h1>
        </div>
        <div className="flex items-center">
          <span className="text-gray-500 mr-4">Changes stored!</span>
          <Button
            onClick={handleDone}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
          >
            Done
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Layers panel - left side */}
        <div className="w-72 border-r bg-white overflow-y-auto p-4 hidden md:block">
          <div className="mb-4">
            <p className="font-medium">Layers · 3 of 10</p>
            <p className="text-sm text-gray-500">Select a layer to edit</p>
          </div>

          <div className="space-y-2">
            <LayerItem
              type="text"
              label="Add text"
              isSelected={selectedLayer === "text"}
              onClick={() => handleLayerSelect("text")}
            />

            <LayerItem
              type="image"
              label="Image"
              isSelected={selectedLayer === "image"}
              onClick={() => handleLayerSelect("image")}
            />

            <LayerItem
              type="canvas"
              label="Canvas"
              isSelected={selectedLayer === "canvas"}
              onClick={() => handleLayerSelect("canvas")}
            />
          </div>
        </div>

        {/* Canvas area - center */}
        <div className="flex-1 flex items-center justify-center p-4 overflow-auto bg-gray-100">
          <div
            className="relative bg-white rounded-lg shadow-lg overflow-hidden"
            style={{
              width: dimensions.width,
              height: dimensions.height,
              backgroundColor: editorState.backgroundColor,
            }}
          >
            {image && (
              <img
                src={image || "/placeholder.svg"}
                alt="Editing preview"
                className="w-full h-full object-contain"
              />
            )}

            {selectedLayer === "text" && (
              <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
                <div
                  className={`
                    ${
                      editorState.textHighlight
                        ? "bg-white bg-opacity-50 px-4 py-2"
                        : ""
                    }
                    ${
                      editorState.textAlignment === "center"
                        ? "text-center w-full"
                        : "text-left w-full"
                    }
                  `}
                  style={{
                    color: editorState.textColor,
                    fontFamily: editorState.fontFamily,
                    fontSize: `${editorState.fontSize}px`,
                  }}
                >
                  {editorState.text}
                </div>
                {selectedLayer === "text" && (
                  <div className="absolute bottom-2 right-2 bg-white bg-opacity-70 px-2 py-1 rounded text-xs">
                    {editorState.text.length}/250
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Settings panel - right side */}
        <div className="w-80 bg-white border-l overflow-y-auto p-4">
          {renderSettings()}
        </div>
      </div>

      {/* Mobile layer selector - only visible on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around">
        <button
          className={`p-2 rounded ${
            selectedLayer === "text" ? "bg-gray-200" : ""
          }`}
          onClick={() => handleLayerSelect("text")}
        >
          Text
        </button>
        <button
          className={`p-2 rounded ${
            selectedLayer === "image" ? "bg-gray-200" : ""
          }`}
          onClick={() => handleLayerSelect("image")}
        >
          Image
        </button>
        <button
          className={`p-2 rounded ${
            selectedLayer === "canvas" ? "bg-gray-200" : ""
          }`}
          onClick={() => handleLayerSelect("canvas")}
        >
          Canvas
        </button>
      </div>

      {/* Hidden file input for image replacement */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleReplaceImage}
        accept="image/*"
      />
    </div>
  );
};

export default ImageEditor;
