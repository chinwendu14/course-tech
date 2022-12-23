import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavbarContainer } from "../styles/layout.style";

const cardarray = [
  {
    lk: "/",
    text: "Student",
  },
  {
    lk: "/school",
    text: "School",
  },
  {
    lk: "/department",
    text: "Department",
  },
];
const Navbar = () => {
  return (
    <div>
      <NavbarContainer>
        {cardarray.map((item, i) => {
          return <SideNavCard {...item} key={i} />;
        })}
      </NavbarContainer>
    </div>
  );
};

export default Navbar;

const SideNavCard = ({ img, text, lk }) => {
  const router = useLocation();

  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (text === "Student" && router.pathname.endsWith("/")) {
      setIsActive(true);
    } else if (router.pathname.includes(lk) && text !== "Student") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [router.pathname, lk, text]);
  return (
    <Link className={`sideNavLink ${isActive ? "active" : ""}`} to={lk}>
      <p>{text}</p>
    </Link>
  );
};
