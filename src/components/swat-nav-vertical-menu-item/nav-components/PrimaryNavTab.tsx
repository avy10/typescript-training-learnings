import { useState, FC, ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";

import { IMenuItem } from "../models";

interface IPrimaryNavTabProps {
  menuItem: IMenuItem;
  activeNavTab: string;
  updateActiveNavTab: (path: string) => void;
}

const PrimaryNavTab: FC<IPrimaryNavTabProps> = ({
  menuItem,
  activeNavTab,
  updateActiveNavTab,
}): ReactElement => {
  const { path, label } = menuItem;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const updateAnchorEl = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <ListItem
      sx={{
        padding: 0,
        width: "fit-content",
      }}
    >
      {/* upon rendering the NavLink with undefined routes (the routes which are not clickable)
      the NavLink is unable to support isActive 
      so those 4 links stay active
      which is why I have to maintain a state which tracks the current active tab
      */}
      {/* 
      <NavLink to={path} onClick={updateAnchorEl}>
          {({ isActive }) => (
            <Box
              sx={{
                background: isActive ? "white" : "#09436d",
                color: isActive ? "#09436d" : "white",
                height: "35px",
                position: "relative",
                borderRight: "1px solid #295b80",
                borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
                cursor: "pointer",
                "&:hover": {
                  color: isActive ? "#09436d" : "white",
                },
                "&:after": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  width: "100%",
                  height: 0,
                  top: 0,
                  zIndex: 0,
                  transition: "height .2s",
                },
                "&:hover:after": {
                  background: "#04284a",
                  height: "100%",
                  transition: "height .2s",
                  opacity: isActive ? "0" : "1",
                },
              }}
            >
              <PrimaryNavTextBox label={label} />
            </Box>
          )}
        </NavLink>
      */}
      {path !== undefined ? (
        <NavLink to={path} onClick={updateAnchorEl}>
          {({ isActive }) => (
            <PrimaryNavContainer
              isActive={activeNavTab === label && isActive}
              label={label}
              path={path}
              updateActiveNavTab={updateActiveNavTab}
            />
          )}
        </NavLink>
      ) : (
        <PrimaryNavContainer
          isActive={activeNavTab === label}
          label={label}
          path={path}
          updateActiveNavTab={updateActiveNavTab}
        />
      )}
    </ListItem>
  );
};

export default PrimaryNavTab;

interface IPrimaryNavContainerProps {
  isActive: boolean;
  label: string;
  path: string;
  updateActiveNavTab: (path: string) => void;
}
const PrimaryNavContainer: FC<IPrimaryNavContainerProps> = ({
  isActive,
  label,
  path,
  updateActiveNavTab,
}) => {
  return (
    <Box
      onClick={() => updateActiveNavTab(label)}
      sx={{
        background: isActive ? "white" : "#09436d",
        color: isActive ? "#09436d" : "white",
        height: "35px",
        position: "relative",
        borderRight: "1px solid #295b80",
        borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
        cursor: "pointer",
        "&:hover": {
          color: isActive ? "#09436d" : "white",
        },
        "&:after": {
          content: '""',
          display: "block",
          position: "absolute",
          width: "100%",
          height: 0,
          top: 0,
          zIndex: 0,
          transition: "height .2s",
        },
        "&:hover:after": {
          background: "#04284a",
          height: "100%",
          transition: "height .2s",
          opacity: isActive ? "0" : "1",
        },
      }}
    >
      <PrimaryNavTextBox label={label} />
    </Box>
  );
};
interface IPrimaryNavTextBoxProps {
  label: string;
}

const PrimaryNavTextBox: FC<IPrimaryNavTextBoxProps> = ({ label }) => {
  return (
    <Typography
      sx={{
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        fontWeight: "bold",
        fontSize: "14px",
        height: "35px",
        position: "relative",
        background: "transparent",
        color: "inherit",
      }}
    >
      {label}
    </Typography>
  );
};
