import { useEffect } from "react";
import { Route, Switch, useLocation, Redirect } from "wouter";
import { trackPageView } from "@/lib/pixel";
import Home from "@/pages/home";
import Espanol from "@/pages/espanol";
import Checkout from "@/pages/checkout";
import CheckoutEs from "@/pages/checkout-es";
import ThankYou from "@/pages/thank-you";
import Gracias from "@/pages/gracias";
import MasterKey from "@/pages/master-key";
import LlaveMaestra from "@/pages/llave-maestra";
import Downloads from "@/pages/downloads";
import NotFound from "@/pages/not-found";
import LivePurchasePopup from "@/components/LivePurchasePopup";

export default function App() {
  const [location] = useLocation();

  // PageView: index.html no longer fires it, so the app owns every one —
  // the first hard load AND each subsequent SPA route change. trackPageView()
  // ignores a repeat of the path it just reported, which absorbs both the
  // "/" -> "/english" redirect and StrictMode's double effect run.
  useEffect(() => {
    trackPageView();
  }, [location]);

  // Show the live-purchase social proof everywhere except the post-purchase page.
  const showPopup =
    location !== "/thank-you" &&
    location !== "/gracias" &&
    location !== "/master-key" &&
    location !== "/llave-maestra" &&
    location !== "/downloads";
  // Spanish visitors get localized purchase notifications.
  const popupLang = location === "/espanol" || location === "/gracias" ? "es" : "en";

  return (
    <>
      <Switch>
        <Route path="/" component={() => <Redirect to="/english" />} />
        <Route path="/english" component={Home} />
        <Route path="/espanol" component={Espanol} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/checkout-es" component={CheckoutEs} />
        <Route path="/thank-you" component={ThankYou} />
        <Route path="/gracias" component={Gracias} />
        <Route path="/master-key" component={MasterKey} />
        <Route path="/llave-maestra" component={LlaveMaestra} />
        <Route path="/downloads" component={Downloads} />
        <Route component={NotFound} />
      </Switch>
      {showPopup && <LivePurchasePopup lang={popupLang} />}
    </>
  );
}
