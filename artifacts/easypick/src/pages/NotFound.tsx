import { Link } from "wouter";

export default function NotFoundPage() {
  return (
    <div className="bg-canvas flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center shadow-soft">
        <h1 className="text-7xl font-extrabold text-gradient-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">That page is off the menu.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow"
          >
            Back to Easypick
          </Link>
        </div>
      </div>
    </div>
  );
}
