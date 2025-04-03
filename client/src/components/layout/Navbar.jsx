"use client";

import {
  Search,
  Bell,
  MessageSquare,
  User,
  HelpCircle,
  Plus,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "../ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.message || "Failed to logout");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full py-2 bg-background ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="flex h-12 items-center px-4 max-w-screen-xl mx-auto justify-center">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <div className="rounded-full bg-[oklch(0.63_0.24_25)] p-1">
              <div className="h-6 w-6 rounded-full bg-[oklch(0.63_0.24_25)] text-white flex items-center justify-center font-bold">
                P
              </div>
            </div>
            {!isMobile && <span className="text-xl font-bold">Picloom</span>}
          </a>

          {!isMobile && (
            <>
              <a
                href="/"
                className="text-sm font-medium hover:bg-black hover:text-white px-3 py-2 rounded-full transition-colors"
              >
                Home
              </a>
              <a
                href="/today"
                className="text-sm font-medium bg-black text-white px-3 py-2 rounded-full"
              >
                Today
              </a>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:bg-black hover:text-white px-3 py-2 h-auto rounded-full transition-colors"
                  >
                    Create <span className="ml-1">▼</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Create Pin</DropdownMenuItem>
                  <DropdownMenuItem>Create Board</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        <div className={`relative mx-4 ${isMobile ? "flex-1" : "w-[500px]"}`}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search"
            className="pl-10 py-2 h-9 rounded-full bg-gray-100 border-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10"
            >
              <Plus className="h-5 w-5" />
              <span className="sr-only">Create</span>
            </Button>
          )}

          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                {isMobile && (
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
