import styled from "styled-components";
export const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  margin: 40px 0;
`;
export const LayoutContainerWidth = styled.div`
  width: 98%;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #131313;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;

  height: 10vh;
  .sideNavLink {
    color: white;
    padding: 10px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .active {
    background-color: #ec1f25;
  }
`;
