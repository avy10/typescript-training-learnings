import { useState, KeyboardEvent, FC } from "react";
import { Box, Typography } from "@mui/material";
import { MENU_DATA } from "../../utils/menuData";
// Define the type for each menu item
interface INestedMenuItem {
  label: string;
  path: string;
}

interface ISubMenuItem {
  label: string;
  submenu?: INestedMenuItem[]; // Optional submenu for deeper levels
  path?: string; // Some items may not have a path
}

interface IMenuItem {
  label: string;
  submenu?: ISubMenuItem[]; // Optional submenu for secondary levels
  path?: string;
}

const Navigation: FC = () => {
  return (
    <Box>
      <Typography variant="h6" aria-label="Navigation Menu">
        Navigation
      </Typography>
      <nav aria-label="Main navigation">
        {MENU_DATA.map((menuItem) => (
          <SingleNavTab key={menuItem.label} menuItem={menuItem} />
        ))}
      </nav>
    </Box>
  );
};

const SingleNavTab: React.FC<{ menuItem: IMenuItem }> = ({ menuItem }) => {
  const [open, setOpen] = useState(false);

  const handleHover = () => setOpen(true);
  const handleLeave = () => setOpen(false);
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
      component="button"
      position="relative"
      border="2px solid red"
      padding="10px"
      aria-haspopup="true"
      aria-expanded={open}
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      aria-controls={`submenu-${menuItem.label}`}
      aria-label={`Navigation item: ${menuItem.label}`}
    >
      <Typography>{menuItem.label}</Typography>
      {open && menuItem.submenu && <SubMenu submenu={menuItem.submenu} />}
    </Box>
  );
};

const SubMenu: React.FC<{ submenu: ISubMenuItem[] }> = ({ submenu }) => {
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
      aria-label={`Submenu for navigation`}
      position="relative"
      border="2px solid black"
      aria-labelledby="submenu"
    >
      {submenu.map((subItem, index) => (
        <SingleSubMenu
          key={subItem.label}
          subItem={subItem}
          active={activeIndex === index}
          handleKeyDown={(e) => handleKeyDown(e)}
        />
      ))}
    </Box>
  );
};

const SingleSubMenu: React.FC<{
  subItem: ISubMenuItem;
  active: boolean;
  handleKeyDown: (e: KeyboardEvent) => void;
}> = ({ subItem, active, handleKeyDown }) => {
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
      aria-label={`Submenu item: ${subItem.label}`}
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
      onKeyDown={handleKeyDown}
      onKeyPress={handleKeyPress}
      style={{ backgroundColor: active ? "#f0f0f0" : "transparent" }}
    >
      <Typography>{subItem.label}</Typography>
      {showLevelTwoMenu && subItem.submenu && (
        <LevelTwoSubMenu
          submenu={subItem.submenu}
          setShowLevelTwoMenu={setShowLevelTwoMenu}
        />
      )}
    </Box>
  );
};

const LevelTwoSubMenu: React.FC<{
  submenu: INestedMenuItem[];
  setShowLevelTwoMenu: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ submenu, setShowLevelTwoMenu }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = (e: KeyboardEvent) => {
    const totalItems = submenu.length;
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
        setShowLevelTwoMenu(false);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      role="menu"
      position="absolute"
      left="150px"
      top="-20px"
      fontSize="10px"
      width="150px"
      border="1px solid blue"
    >
      {submenu.map((nestedItem, index) => (
        <Typography
          key={`${nestedItem.label}-${index}`}
          role="menuitem"
          tabIndex={0}
          onKeyDown={(e) => {
            e.stopPropagation();
            handleKeyDown(e);
          }}
          aria-label={`${nestedItem.label} item`}
          style={{
            backgroundColor: activeIndex === index ? "#f0f0f0" : "transparent",
          }}
        >
          {nestedItem.label}
        </Typography>
      ))}
    </Box>
  );
};

export default Navigation;
