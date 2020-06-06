import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import CloseButton from "./CloseButton";
import ModalPortal from "../client/ModalPortal";

interface ModalProps extends HTMLAttributes<HTMLElement> {
  visible: boolean;
  children: React.ReactNode;
  onClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  maskClosable: boolean;
  closable: boolean;
}

const Modal: React.FC<ModalProps> = ({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
}) => {
  const onMaskClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClose) {
      onClose(e);
    }
  };

  return (
    <ModalPortal elementId="modal-root">
      <ModalOverlay visible />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : undefined}
        visible={visible}
      >
        <ModalInner className="modal-inner">
          <CloseButtonWrapper>
            {closable && (
              <CloseButton className="modal-close" onClick={close} />
            )}
          </CloseButtonWrapper>
          {children}
        </ModalInner>
      </ModalWrapper>
    </ModalPortal>
  );
};

const CloseButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

interface ModalOverlayProps {
  visible: boolean;
}
const ModalOverlay = styled.div<ModalOverlayProps>`
  background-color: rgba(255, 255, 255, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: ${(props) => (props.visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

interface ModalWrapperProps {
  onClick: any;
  visible: boolean;
}
const ModalWrapper = styled.div<ModalWrapperProps>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
  background-color: #fff;
  border-radius: 2px;
  width: 600px;
  max-width: 600px;
  height: fit-content;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 30px 20px;
`;

export default Modal;
