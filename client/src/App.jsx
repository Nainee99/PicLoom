import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Toggle } from "@/components/ui/toggle";

const TestShadCN = () => {
  return (
    <div className="p-10 space-y-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold">ShadCN Components Test</h1>

      {/* Buttons */}
      <div className="space-x-2">
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
      </div>

      {/* Input & Textarea */}
      <div className="w-80">
        <Input placeholder="Test Input" />
        <Textarea placeholder="Test Textarea" className="mt-2" />
      </div>

      {/* Card */}
      <Card className="w-80">
        <CardContent className="p-4">
          <p>Card Content Goes Here</p>
        </CardContent>
      </Card>

      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Dropdown</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog (Modal) */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>This is a test dialog.</DialogDescription>
        </DialogContent>
      </Dialog>

      {/* Avatar */}
      <Avatar>
        <AvatarImage src="https://via.placeholder.com/150" alt="Avatar" />
        <AvatarFallback>PL</AvatarFallback>
      </Avatar>

      {/* Tooltip */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover Me</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltip Content</TooltipContent>
      </Tooltip>

      {/* Toast */}
      <Button onClick={() => toast("Toast Message")}>Show Toast</Button>

      {/* Alert */}
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>This is a test alert.</AlertDescription>
      </Alert>

      {/* Badge */}
      <Badge variant="default">Badge</Badge>
      <Badge variant="secondary">Secondary Badge</Badge>

      {/* Sheet (Sidebar) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <p>This is a test sidebar (Sheet).</p>
        </SheetContent>
      </Sheet>

      {/* Toggle */}
      <Toggle aria-label="Toggle button">Toggle</Toggle>
    </div>
  );
};

export default TestShadCN;
