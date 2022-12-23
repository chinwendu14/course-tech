import styled from "styled-components";

export const FormControl = styled.div`
  border: none;
  width: 100%;

  p {
    padding-bottom: ${(props) => (props.pd ? "10px" : "")};
  }
  input {
    background-color: white;
    border-radius: 8px;

    width: 100%;
    border:1px solide black
    height: ${(props) => (props.height ? props.height : "60px")};

    padding: 10px 20px;
  }
  input:focus {
    outline: none;
  }
`;
