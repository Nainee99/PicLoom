import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  MoreHorizontal,
  Upload,
  Plus,
  Download,
  Flag,
  EyeOff,
  Link,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

export default function PinCard({ pin }) {
  const [isHovered, setIsHovered] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="mb-4">
      <div
        className="group relative rounded-2xl overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative w-full"
          style={{
            backgroundColor: pin.color,
          }}
        >
          <img
            src={pin.image || "/placeholder.svg"}
            alt={pin.title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />

          {/* Overlay on hover */}
          <div
            className={`absolute inset-0 bg-black/40 flex flex-col justify-between p-3 transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full bg-red-600 hover:bg-red-700 text-white"
              >
                Save
              </Button>
            </div>

            <div className="flex justify-between items-center">
              {/* Removed description text */}

              <div className="flex gap-1 ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8 bg-background/80 hover:bg-background"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-60">
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">
                      This Pin was inspired by your recent activity
                    </div>
                    <DropdownMenuItem>
                      <EyeOff className="mr-2 h-4 w-4" />
                      <span>Hide Pin</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download image</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Flag className="mr-2 h-4 w-4" />
                      <span>Report Pin</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 bg-background/80 hover:bg-background"
                  onClick={() => setShareOpen(true)}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creator info below the image */}
      <div className="flex items-center justify-between mt-2 px-1">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={pin.user.avatar} alt={pin.user.name} />
            <AvatarFallback>{pin.user.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{pin.user.name}</span>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Share</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center gap-4 py-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12"
            >
              <Link className="h-5 w-5" />
              <span className="sr-only">Copy link</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-green-500 text-white border-0 hover:bg-green-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                stroke="white"
                strokeWidth="0"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z" />
                <path d="M20.52 3.449a12.224 12.224 0 0 0-8.654-3.449c-6.729 0-12.21 5.473-12.21 12.21 0 2.147.555 4.243 1.622 6.069l-1.722 6.271 6.22-1.626a12.269 12.269 0 0 0 6.09 1.551h.004c6.729 0 12.21-5.473 12.21-12.21 0-3.255-1.268-6.31-3.56-8.616zm-8.654 18.787h-.005a10.2 10.2 0 0 1-5.191-1.427l-.37-.221-3.85 1.012 1.025-3.773-.24-.375a10.152 10.152 0 0 1-1.563-5.42c0-5.607 4.563-10.17 10.17-10.17 2.704 0 5.243 1.052 7.149 2.979a10.15 10.15 0 0 1 2.979 7.149c0 5.607-4.563 10.17-10.17 10.17z" />
              </svg>
              <span className="sr-only">WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-[#0099FF] text-white border-0 hover:bg-[#0088ee]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                stroke="white"
                strokeWidth="0"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 0c-6.627 0-12 4.975-12 11.111 0 3.497 1.745 6.616 4.472 8.652v4.237l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111 0-6.136-5.373-11.111-12-11.111zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z" />
              </svg>
              <span className="sr-only">Messenger</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-[#1877F2] text-white border-0 hover:bg-[#0e6edf]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                stroke="white"
                strokeWidth="0"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-black text-white border-0 hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="sr-only">X</span>
            </Button>
          </div>

          <Separator />

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name or email" className="pl-10" />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>SV</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium italic">ShadowyVisions</p>
                <p className="text-xs text-muted-foreground">@Namee00</p>
              </div>
            </div>
            <Button className="rounded-full">Send</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
