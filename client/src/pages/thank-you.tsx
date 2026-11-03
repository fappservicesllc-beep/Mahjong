import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

// NOTE: no Purchase event here, by design.
// Payment happens on Shopify, not on this page — this page can be reached
// without paying (direct link, back button, refresh), so firing Purchase here
// would report sales that never happened. Shopify's native Meta integration
// fires Purchase on its own order-confirmation page, after payment clears.
export default function ThankYou() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const email = params.get("email") || "";

  return (
    <div className="min-h-screen marble-bg">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-sage/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-brand-sage" />
          </div>
          <div className="divider-flourish mb-4 text-xs tracking-[0.3em] uppercase">
            Welcome to the circle
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-thanks-headline">
            You're in.{" "}
            <span className="italic text-brand-orange">Welcome.</span>
          </h1>
          <p className="text-lg text-brand-ink/75 max-w-xl mx-auto">
            Your Master-Key is unlocked. Everything below is ready to download —
            {email && (
              <>
                {" "}and we've sent copies to{" "}
                <span className="font-semibold text-brand-ink" data-testid="text-thanks-email">{email}</span>.
              </>
            )}
          </p>
        </div>

        <div className="bg-brand-pink text-brand-ink rounded-3xl p-6 md:p-8 text-center border border-brand-gold/30">
          <Mail className="w-8 h-8 mx-auto mb-3 text-brand-orange" />
          <h3 className="font-serif text-xl font-semibold mb-2">One last thing.</h3>
          <p className="text-sm text-brand-ink/80 max-w-md mx-auto">
            Check your inbox in the next few minutes for your welcome email and a
            secret bonus: our list of the 3 winning hands to memorize first.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link href="/">
            <Button variant="ghost" className="text-brand-ink/70 hover:text-brand-ink" data-testid="button-back-home">
              Back to home <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
