"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  AlignLeft,
  AlignCenter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ColorPicker from "./ColorPicker";

const TextSettings = ({ editorState, updateEditorState }) => {
  const [fontIndex, setFontIndex] = useState(0);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const fonts = [
    "Superglue",
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Verdana",
    "Courier New",
    "Trebuchet MS",
    "Impact",
    "Comic Sans MS",
    "Palatino",
    "Garamond",
    "Bookman",
    "Avant Garde",
  ];

  // Find the current font index when component mounts
  useEffect(() => {
    const index = fonts.findIndex((font) => font === editorState.fontFamily);
    if (index !== -1) {
      setFontIndex(index);
    }
  }, []);

  const handleFontChange = (direction) => {
    let newIndex;
    if (direction === "next") {
      newIndex = (fontIndex + 1) % fonts.length;
    } else {
      newIndex = fontIndex - 1 < 0 ? fonts.length - 1 : fontIndex - 1;
    }
    setFontIndex(newIndex);
    updateEditorState({ fontFamily: fonts[newIndex] });
  };

  const handleFontSizeChange = (e) => {
    const size = Number.parseInt(e.target.value) || 1;
    updateEditorState({ fontSize: Math.min(Math.max(size, 1), 100) });
  };

  const handleAlignmentChange = (alignment) => {
    updateEditorState({ textAlignment: alignment });
  };

  const handleHighlightChange = (highlight) => {
    updateEditorState({ textHighlight: highlight });
  };

  const handleTextChange = (e) => {
    const text = e.target.value.slice(0, 250);
    updateEditorState({
      text: text,
      characterCount: text.length,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Font</Label>
        <div className="flex items-center border rounded-md bg-gray-100">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400"
            onClick={() => handleFontChange("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div
            className="flex-1 text-center font-medium py-2"
            style={{ fontFamily: fonts[fontIndex] }}
          >
            {fonts[fontIndex]}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400"
            onClick={() => handleFontChange("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Font size</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={editorState.fontSize}
            onChange={handleFontSizeChange}
            className="w-16"
          />
          <div className="text-sm">px</div>
          <div className="flex-1 flex justify-end">
            <div className="text-2xl">aA</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Alignment</Label>
        <div className="flex gap-2">
          <Button
            variant={
              editorState.textAlignment === "left" ? "default" : "outline"
            }
            size="icon"
            onClick={() => handleAlignmentChange("left")}
            className="rounded-md"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant={
              editorState.textAlignment === "center" ? "default" : "outline"
            }
            size="icon"
            onClick={() => handleAlignmentChange("center")}
            className="rounded-md"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Color</Label>
        <Popover open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center">
                <div
                  className="w-5 h-5 rounded-full mr-2"
                  style={{ backgroundColor: editorState.textColor }}
                />
                <span>{editorState.textColor}</span>
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
              selectedColor={editorState.textColor}
              onColorChange={(color) => {
                updateEditorState({ textColor: color });
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Highlight</Label>
        <div className="flex gap-2">
          <Button
            variant={!editorState.textHighlight ? "default" : "outline"}
            onClick={() => handleHighlightChange(false)}
            className="flex-1 rounded-md"
          >
            A
          </Button>
          <Button
            variant={editorState.textHighlight ? "default" : "outline"}
            onClick={() => handleHighlightChange(true)}
            className="flex-1 bg-gray-200 text-black rounded-md"
          >
            A
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Text</Label>
        <div className="relative">
          <textarea
            value={editorState.text}
            onChange={handleTextChange}
            className="w-full p-2 border rounded-md h-24 resize-none"
            maxLength={250}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {editorState.text.length}/250
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSettings;
