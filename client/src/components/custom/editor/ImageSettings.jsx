"use client";

import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";

const ImageSettings = ({
  image,
  onReplaceClick,
  editorState,
  updateEditorState,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Image</Label>
        <div
          className="border rounded-lg p-2 relative group cursor-pointer"
          onClick={onReplaceClick}
        >
          <div className="w-full h-32 bg-gray-100 rounded overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt="Selected"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
            <div className="flex flex-col items-center text-white">
              <Upload className="h-6 w-6 mb-1" />
              <span className="text-sm font-medium">Replace</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSettings;
