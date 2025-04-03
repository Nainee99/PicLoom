"use client";

import { Smartphone, Monitor } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import ColorPicker from "./ColorPicker";

const CanvasSettings = ({ editorState, updateEditorState }) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const handleOrientationChange = (orientation) => {
    updateEditorState({ orientation });
  };

  const handleAspectRatioChange = (aspectRatio) => {
    updateEditorState({ aspectRatio });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Orientation</Label>
        <div className="flex gap-2">
          <Button
            variant={
              editorState.orientation === "portrait" ? "default" : "outline"
            }
            onClick={() => handleOrientationChange("portrait")}
            className="flex-1 rounded-md"
          >
            <Smartphone className="h-4 w-4 mr-2" />
            Portrait
          </Button>
          <Button
            variant={
              editorState.orientation === "landscape" ? "default" : "outline"
            }
            onClick={() => handleOrientationChange("landscape")}
            className="flex-1 rounded-md"
          >
            <Monitor className="h-4 w-4 mr-2" />
            Landscape
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Size</Label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { value: "original", label: "Original" },
            { value: "1:2", label: "1:2" },
            { value: "9:16", label: "9:16" },
            { value: "2:3", label: "2:3" },
            { value: "3:4", label: "3:4" },
            { value: "4:5", label: "4:5" },
            { value: "1:1", label: "1:1" },
          ].map((option) => (
            <Button
              key={option.value}
              variant={
                editorState.aspectRatio === option.value ? "default" : "outline"
              }
              onClick={() => handleAspectRatioChange(option.value)}
              className="rounded-md"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Background color</Label>
        <Popover open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center">
                <div
                  className="w-5 h-5 rounded-full mr-2"
                  style={{ backgroundColor: editorState.backgroundColor }}
                />
                <span>{editorState.backgroundColor}</span>
              </div>
              <ChevronRight
                className={`h-4 w-4 transition-transform ${
                  isColorPickerOpen ? "rotate-90" : ""
                }`}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <ColorPicker
              selectedColor={editorState.backgroundColor}
              onColorChange={(color) => {
                updateEditorState({ backgroundColor: color });
                setIsColorPickerOpen(false);
              }}
              showHexInput
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CanvasSettings;
