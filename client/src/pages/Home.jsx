import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
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

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">PicLoom</h1>
          <Button onClick={handleLogout} variant="ghost">
            Logout
          </Button>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pin feed will be implemented here */}
          <div className="text-center text-gray-500">
            Pin feed coming soon...
          </div>
        </div>
      </main>
    </div>
  );
}