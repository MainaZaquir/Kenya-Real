import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { track } from "@vercel/analytics";

export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    console.log("Page changed:", location.pathname);

    track("pageview", {
      path: location.pathname,
    });
  }, [location]);
}
