"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ImageUploader = ({ image, onChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file);
  };

  return (
    <Card
      className={`border-2 border-dashed ${
        dragActive ? "border-primary" : "border-gray-300"
      } rounded-lg`}
    >
      <CardContent className="p-0">
        <div
          className="flex flex-col items-center justify-center h-[400px] p-6 text-center"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {preview || image ? (
            <img
              src={preview || image}
              alt="Preview"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <>
              <Upload className="h-10 w-10 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Choose a file or drag and drop
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                We recommend using high quality .jpg files less than 20 MB or
                .mp4 files less than 200 MB.
              </p>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleChange}
                accept="image/*,video/*"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors"
              >
                Choose a file
              </label>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
