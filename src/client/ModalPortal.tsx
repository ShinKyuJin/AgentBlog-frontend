import { useMemo } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  elementId: string;
}

const ModalPortal: React.FC<PortalProps> = ({ children, elementId }) => {
  const rootElement = useMemo(() => document.getElementById(elementId), [
    elementId,
  ]);
  if (rootElement === null) return null;

  return createPortal(children, rootElement);
};

export default ModalPortal;
