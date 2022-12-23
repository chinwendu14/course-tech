import React from "react";
import { ButtonContainer } from "../styles/button.style";

const Button = ({ btnText, btntype }) => {
  return <ButtonContainer type={btntype}>{btnText}</ButtonContainer>;
};

export default Button;
