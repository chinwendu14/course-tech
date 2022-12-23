import styled, { keyframes } from "styled-components";

const width = keyframes`
  from {
    width:0
  }

  to {
    width:100%

  }
`;
const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}`;
export const ModalContainer = styled.div`
  padding: 100px 100px;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.447);
  position: fixed;
  z-index: auto;
  width: 100%;
  top: 0;
  left: ${(props) => (props.left ? "0" : "-105%")};
  transition: 0.4s ease-in-out;

  @media (max-width: 768px) {
    padding: 100px 10px;
  }
`;
export const ModalTimesDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  p {
    font-size: 20px;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
    padding: 5px 12px;
  }
`;

export const ModalWhiteDiv = styled.div`
  width: 60%;
  overflow-y: auto;
  background: #fafafa;
  border-radius: 16px;
  padding: 20px;
  height: ${(prop) => (prop.height ? prop.height : "")};

  @media (max-width: 768px) {
    width: 100%;
    height: fit-content;
  }
`;

export const ToastContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: fixed;
  z-index: auto;
  width: 100%;
  top: 0;
  right: ${(props) => (props.left ? "0" : "-100%")};
  transition: 0.4s ease-in-out;
  cursor: pointer;
`;
export const ToastWhiteDiv = styled.div`
  margin-top: 15px;
  width: 30%;
  display: flex;
  justify-content: space-between;
  background: ${(props) => (props.red ? " #ffd6e0" : "#90ee90")};
  transition: 0.4s ease-in-out;

  &:before {
    content: "";
    height: 5%;
    animation: ${width} 9s ease-in-out;

    right: -10;
    bottom: 0px;
    position: absolute;
    background-color: white;
    z-index: 7;
  }
  p {
    padding: 10px;
  }
`;

export const SpinnerLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 50vh;
  p {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 16px solid #f3f3f3;

    border-top: 16px solid #0c0932;

    transition: 0.4s ease-in-out;

    animation: ${rotate} 1s linear infinite;
  }
`;
