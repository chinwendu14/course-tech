import React from "react";
import { LayoutContainer, LayoutContainerWidth } from "../styles/layout.style";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <LayoutContainerWidth>
        <Navbar />
        <div>{children}</div>
      </LayoutContainerWidth>
    </LayoutContainer>
  );
};

export default Layout;
