/* eslint-disable no-unused-vars */

import styled from "styled-components";

export const TextFieldContainerFlex = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const TextFieldContainerWidth = styled.div`
  width: 48%;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    width: 100%;
    padding-top: 10px;
  }
`;
export const TextFieldContainer = styled.div`
  padding-top: 10px;

  @media (max-width: 768px) {
    padding-top: 10px;
  }
`;
