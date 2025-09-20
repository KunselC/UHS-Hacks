import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    // Fallback: make visible after 100ms if intersection observer fails
    const fallbackTimer = setTimeout(() => {
      if (!isVisible) {
        console.log("Fallback visibility triggered");
        setIsVisible(true);
      }
    }, 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Element is intersecting, making visible");
          setIsVisible(true);
          observer.unobserve(entry.target);
          clearTimeout(fallbackTimer);
        }
      },
      {
        threshold,
        rootMargin: "50px 0px -50px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    } else {
      // If ref is not available, make visible immediately
      setIsVisible(true);
      clearTimeout(fallbackTimer);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, isVisible]);

  return [ref, isVisible];
};
