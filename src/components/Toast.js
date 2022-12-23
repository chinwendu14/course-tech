import React from "react";
import { ToastContainer, ToastWhiteDiv } from "../styles/modal.style";

const Toast = ({ onClick, text, toggle }) => {
  return (
    <ToastContainer left={toggle}>
      <ToastWhiteDiv>
        <p>{text}</p>
        <p onClick={onClick}>X</p>
      </ToastWhiteDiv>
    </ToastContainer>
  );
};

export default Toast;
