import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { AdminRoute } from "./AdminRoute";
import TodayPage from "@/pages/TodayPage";
import Navbar from "@/components/layout/Navbar";
import CreatePinPage from "@/pages/CreatePinLanding";
import CreatePinLanding from "@/pages/CreatePinLanding";
import PinCreationForm from "@/pages/PinCreationForm";
import ImageEditor from "@/pages/ImageEditor";

// Lazy load components
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/auth/Login"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const Profile = lazy(() => import("@/pages/Profile"));
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Navbar />
          <Home />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/today",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Navbar />
          <TodayPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-pin",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Navbar />
          <CreatePinLanding />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-pin/form",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Navbar />
          <PinCreationForm />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-pin/edit-image",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Navbar />
          <ImageEditor />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: (
          <PublicRoute>
            <Suspense fallback={<LoadingFallback />}>
              <Login />
            </Suspense>
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <Suspense fallback={<LoadingFallback />}>
              <SignUp />
            </Suspense>
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Profile />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <Suspense fallback={<LoadingFallback />}>
          <AdminDashboard />
        </Suspense>
      </AdminRoute>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
