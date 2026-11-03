import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen cream-bg flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-serif text-8xl font-bold gold-foil mb-4" data-testid="text-404">404</p>
        <h1 className="font-serif text-3xl font-bold mb-3">This hand is dead.</h1>
        <p className="text-brand-ink/70 mb-8">
          The page you're looking for isn't at the table. Let's get you back to the circle.
        </p>
        <Link href="/">
          <Button className="hover-elevate active-elevate-2 bg-brand-teal hover:bg-brand-teal text-brand-ink rounded-full px-6" data-testid="button-home">
            Return to the Master-Key
          </Button>
        </Link>
      </div>
    </div>
  );
}
