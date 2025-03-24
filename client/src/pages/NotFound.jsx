import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}