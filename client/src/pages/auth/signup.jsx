import { GalleryVerticalEnd } from "lucide-react";
import { SignUpForm } from "@/components/forms/SignupForm";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-2 p-4 md:p-6">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center font-medium">
            <img src="/logo.png" className="h-8 w-8" />
            Picloom
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/bg-cover.jpg"
          alt="Background Cover"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
