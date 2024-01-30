import { useEffect, useRef, useState } from "react";

const useElementOnScreen = (
  options: IntersectionObserverInit,
  defaultVisible?: boolean
) => {
  const containerRef = useRef<HTMLElement>();
  const [isVisible, setIsVisible] = useState(defaultVisible);

  const callbackFunction: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

export default useElementOnScreen;
