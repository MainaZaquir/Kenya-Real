import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    va?: {
      track: (event: string) => void;
    };
  }
}

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window.va) {
      window.va.track("pageview");
    }
  }, [location]);
}
