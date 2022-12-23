import React from "react";
import {
  ModalContainer,
  ModalTimesDiv,
  ModalWhiteDiv,
} from "../styles/modal.style";

const Modal = ({ children, onClick, toggle, height }) => {
  return (
    <ModalContainer left={toggle}>
      <ModalWhiteDiv height={height}>
        <ModalTimesDiv onClick={onClick}>
          <p>X</p>
        </ModalTimesDiv>
        {children}
      </ModalWhiteDiv>
    </ModalContainer>
  );
};

export default Modal;
