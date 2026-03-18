import { useState, useEffect } from "react";

export type LayoutVariant = "signage" | "desktop";

/**
 * Detects layout variant based on screen orientation & dimensions.
 *
 *   Signage  — portrait  (1080×1920): height > width
 *   Desktop  — landscape (1920×1080): width > height
 */
export function useLayoutVariant(): LayoutVariant {
  const [variant, setVariant] = useState<LayoutVariant>("desktop");

  useEffect(() => {
    const update = () => {
      setVariant(
        window.innerHeight > window.innerWidth ? "signage" : "desktop",
      );
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return variant;
}
