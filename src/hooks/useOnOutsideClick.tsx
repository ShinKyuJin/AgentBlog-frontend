import { useRef, useEffect } from "react";

export const useOnOutsideClick = (handleOutsideClick: any) => {
  const innerBorderRef = useRef<HTMLElement>(null);

  const onClick = (event: any) => {
    if (
      innerBorderRef.current &&
      !innerBorderRef.current.contains(event.target)
    ) {
      handleOutsideClick();
    }
  };

  useEffect(() => {
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return { innerBorderRef };
};
