import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const FadeIn = ({ children, delay = 0 }) => {
  const [inView, setInView] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInView(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [location.pathname, delay]);

  return (
    <div
      className={`transition-all duration-1000 ease-in-out delay-${delay}ms ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[100%]"
      }`}
    >
      {children}
    </div>
  );
};
