import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { ISubMenuItem } from "../models";
import TertiaryNav from "./TertiaryNav";
interface ISecondaryNavTabProps {
  subItem: ISubMenuItem;
  active: boolean;
  handleKeyDown: (e: KeyboardEvent) => void;
}
const SecondaryNavTab: FC<ISecondaryNavTabProps> = ({
  subItem,
  active,
  handleKeyDown,
}) => {
  const navigate = useNavigate();

  const [showLevelTwoMenu, setShowLevelTwoMenu] = useState(false);

  const handleHover = () => setShowLevelTwoMenu(true);
  const handleLeave = () => setShowLevelTwoMenu(false);
  const handleKeyPress = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "Enter" || e.key === " ") {
      setShowLevelTwoMenu((prev) => !prev);
    } else if (e.key === "Escape") {
      setShowLevelTwoMenu(false);
    }
  };

  return (
    <Box
      role="menuitem"
      tabIndex={0}
      aria-haspopup="true"
      aria-expanded={showLevelTwoMenu}
      aria-label={`${subItem.label}`}
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
      onKeyDown={handleKeyDown}
      onKeyPress={handleKeyPress}
      sx={{
        position: "relative",
        background: "#f4f6f9",
        color: "#000000",
        maxHeight: "72px",
      }}
    >
      <Typography
        sx={{
          fontWeight: "500",
          fontSize: "14px",
          padding: "8px 10px 8px 20px",
          borderBottom: "1px solid #b5b5b5",
        }}
      >
        {subItem.label}
      </Typography>
      {showLevelTwoMenu && subItem.submenu && (
        <TertiaryNav
          submenu={subItem.submenu}
          setShowLevelTwoMenu={setShowLevelTwoMenu}
        />
      )}
    </Box>
  );
};
export default SecondaryNavTab;
