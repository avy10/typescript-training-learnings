import { useState, FC } from "react";
// import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import { ISubMenuItem } from "../models";
import SecondaryNavTab from "./SecondaryNavTab";
interface ISecondaryNavProps {
  submenu: ISubMenuItem[];
}
const SecondaryNav: FC<ISecondaryNavProps> = ({ submenu }) => {
  //   const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = (e: KeyboardEvent) => {
    const totalItems = submenu.length;
    e.stopPropagation();
    switch (e.key) {
      case "ArrowDown":
        setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems);
        break;
      case "ArrowUp":
        setActiveIndex(
          (prevIndex) => (prevIndex - 1 + totalItems) % totalItems
        );
        break;
      case "Escape":
        setActiveIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      role="menu"
      aria-label={`Submenu`}
      // aria-labelledby="submenu"
      sx={{
        position: "absolute",
        top: "35px",
        left: "-11px",
        // width: "max-content", // works well to adjust the box size according to text length, but makes it difficult to manage the nested menu
        width: "218px", //makes it easier to control placement of nested menu if I have a fixed value
        transition: "max-height 0.4s ease-out",
        textAlign: "left",
        boxShadow: "3px 2px 3px 0 #666",
        // overflowX: "hidden",
        // overflowY: "scroll",
        maxHeight: "90vh",
        "&::-webkit-scrollbar": {
          height: "1px",
          width: "1px",
          borderRadius: "25px",
        },
        "&::-webkit-scrollbar-track": {
          background: "black",
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#ccc",
          background: "black",
          borderRadius: "30px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#bbb",
        },
      }}
    >
      {submenu.map((subItem, index) => (
        <SecondaryNavTab
          key={subItem.label}
          subItem={subItem}
          active={activeIndex === index}
          handleKeyDown={(e) => handleKeyDown(e)}
        />
      ))}
    </Box>
  );
};

export default SecondaryNav;
