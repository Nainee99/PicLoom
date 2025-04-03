"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Pencil } from "lucide-react";
import ImageUploader from "@/components/custom/ImageUploader";
import CreateBoardModal from "@/components/custom/CreateBoardModal";

const PinCreationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    board: "",
    tags: [],
    altText: "",
    allowComments: true,
    image: null,
  });

  const [tagInput, setTagInput] = useState("");
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const [boards, setBoards] = useState([
    { id: "1", name: "Fashion" },
    { id: "2", name: "Home Decor" },
    { id: "3", name: "Recipes" },
    { id: "4", name: "Travel" },
  ]);

  // Check if we have an edited image from the editor
  useEffect(() => {
    if (location.state?.editedImage) {
      setFormData((prev) => ({
        ...prev,
        image: location.state.editedImage,
      }));
    }
  }, [location.state]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      handleInputChange("tags", [...formData.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleAddBoard = (newBoard) => {
    setBoards([...boards, newBoard]);
    handleInputChange("board", newBoard.id);
    setIsCreateBoardOpen(false);
  };

  const handleEditImage = () => {
    if (formData.image) {
      navigate("/create-pin/edit-image", { state: { image: formData.image } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-screen-xl mx-auto">
        <Card className="w-full">
          <CardContent className="p-6">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="md:col-span-1 relative">
                <ImageUploader
                  image={formData.image}
                  onChange={(image) => handleInputChange("image", image)}
                />

                {formData.image && (
                  <button
                    type="button"
                    onClick={handleEditImage}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Pencil className="h-5 w-5 text-gray-700" />
                  </button>
                )}
              </div>

              <div className="md:col-span-1 space-y-6">
                {/* Title Input */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Add a title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Add a detailed description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                  />
                </div>

                {/* Link Input */}
                <div className="space-y-2">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    placeholder="Add a link"
                    value={formData.link}
                    onChange={(e) => handleInputChange("link", e.target.value)}
                  />
                </div>

                {/* Board Selector */}
                <div className="space-y-2">
                  <Label htmlFor="board">Board</Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.board}
                      onValueChange={(value) =>
                        handleInputChange("board", value)
                      }
                    >
                      <SelectTrigger id="board" className="w-full">
                        <SelectValue placeholder="Choose a board" />
                      </SelectTrigger>
                      <SelectContent>
                        {boards.map((board) => (
                          <SelectItem key={board.id} value={board.id}>
                            {board.name}
                          </SelectItem>
                        ))}
                        <Button
                          variant="ghost"
                          className="w-full justify-start pl-2 gap-2"
                          onClick={() => setIsCreateBoardOpen(true)}
                          type="button"
                        >
                          <Plus className="h-4 w-4" />
                          Create board
                        </Button>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Tagged Topics */}
                <div className="space-y-2">
                  <Label>Tagged topics ({formData.tags.length})</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tag}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search for a tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAddTag}
                      disabled={!tagInput.trim()}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add tag</span>
                    </Button>
                  </div>
                </div>

                {/* Alt Text Input */}
                <div className="space-y-2">
                  <Label htmlFor="alt-text">Alt Text</Label>
                  <Textarea
                    id="alt-text"
                    placeholder="Describe your image for better accessibility"
                    value={formData.altText}
                    onChange={(e) =>
                      handleInputChange("altText", e.target.value)
                    }
                    rows={2}
                  />
                  <p className="text-sm text-muted-foreground">
                    Alt text helps people with visual impairments understand
                    your Pin.
                  </p>
                </div>

                {/* Comments Switch */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="comments" className="text-base">
                      Allow comments
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Let people comment on this Pin
                    </p>
                  </div>
                  <Switch
                    id="comments"
                    checked={formData.allowComments}
                    onCheckedChange={(checked) =>
                      handleInputChange("allowComments", checked)
                    }
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Publish
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Create Board Modal */}
      <CreateBoardModal
        isOpen={isCreateBoardOpen}
        onClose={() => setIsCreateBoardOpen(false)}
        onCreateBoard={handleAddBoard}
      />
    </div>
  );
};

export default PinCreationForm;
