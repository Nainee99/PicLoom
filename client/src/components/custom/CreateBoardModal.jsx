"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const CreateBoardModal = ({ isOpen, onClose, onCreateBoard }) => {
  const [boardName, setBoardName] = useState("");
  const [isSecret, setIsSecret] = useState(false);

  const handleCreateBoard = () => {
    if (boardName.trim()) {
      const newBoard = {
        id: Date.now().toString(),
        name: boardName.trim(),
        isSecret,
      };

      onCreateBoard(newBoard);
      setBoardName("");
      setIsSecret(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create board</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="board-name">Name</Label>
            <Input
              id="board-name"
              placeholder='Like "Places to Go" or "Recipes to Make"'
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="secret-board"
              checked={isSecret}
              onCheckedChange={setIsSecret}
            />
            <div>
              <Label htmlFor="secret-board">Keep this board secret</Label>
              <p className="text-sm text-muted-foreground">
                So only you and collaborators can see it.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateBoard}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoardModal;
