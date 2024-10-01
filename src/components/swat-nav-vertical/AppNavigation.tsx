import { useState, KeyboardEvent, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import styles from "./AppNavigation.module.css";
import { MENU_DATA } from "../../utils/menuData";
// Interfaces
interface INestedMenuItem {
  label: string;
  path: string;
}

interface ISubMenuItem {
  label: string;
  submenu?: INestedMenuItem[];
  path?: string;
}

interface IMenuItem {
  label: string;
  submenu?: ISubMenuItem[];
  path?: string;
}
// ---

const AppNavigation: FC = () => {
  return (
    <nav aria-label="Main navigation" className={styles.mainNav}>
      {MENU_DATA.map((menuItem) => (
        <PrimaryNavTab key={menuItem.label} menuItem={menuItem} />
      ))}
    </nav>
  );
};

export default AppNavigation;

const PrimaryNavTab: FC<{ menuItem: IMenuItem }> = ({ menuItem }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const handleHover = () => setOpen(true);
  const handleLeave = () => setOpen(false);
  const handleClick = (path: string) => {
    if (path !== "undefined") {
      navigate(`/${path}`);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "Enter" || e.key === " ") {
      setOpen((prev) => !prev);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };
  return (
    <Box
      // component="button" // review
      aria-haspopup="true"
      aria-expanded={open}
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
      onClick={() => handleClick(menuItem.path)}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      aria-controls={`submenu-${menuItem.label}`}
      aria-label={`Navigation item: ${menuItem.label}`}
      sx={{
        color: "white",
        display: "flex",
        "column-gap": "0px",
        background: "#09436d",
        margin: "0",
        padding: "10px",
      }}
    >
      <Typography>{menuItem.label}</Typography>
    </Box>
  );
};
