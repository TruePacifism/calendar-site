import { useCallback, useEffect } from "react";

const useBackButton = (callback: (this: Window, ev: PopStateEvent) => any) => {
  const handleBackButton = useCallback(callback, [callback]);

  useEffect(() => {
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [handleBackButton]);
};
export default useBackButton;
