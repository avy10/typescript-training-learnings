// import { useState, FC, ReactElement, MouseEvent } from "react";
import { FC, ReactElement } from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";

import { IMenuItem } from "../../models";
import PrimaryNavContainer from "./PrimaryNavContainer";

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
  console.log("Re RENDER of PrimaryNavTab");
  const { path, label, submenu } = menuItem;

  // useEffect(() => {
  //   console.log(anchorEl);
  // }, [anchorEl]);

  return (
    <ListItem
      sx={{
        padding: 0,
        width: "fit-content",
      }}
    >
      {/* comment was here */}
      {path !== undefined ? (
        // <NavLink to={path} onClick={updateAnchorEl}>
        <NavLink
          to={path}
          // onClick={(event: MouseEvent<HTMLElement>) => updateAnchorEl(event)}
        >
          {({ isActive }) => (
            <PrimaryNavContainer
              isActive={activeNavTab === label && isActive}
              label={label}
              submenu={submenu}
              // path={path}
              updateActiveNavTab={updateActiveNavTab}
              // anchorEl={anchorEl}
              // clearAnchorEl={clearAnchorEl}
              // hoverAction={hoverAction}
            />
          )}
        </NavLink>
      ) : (
        <PrimaryNavContainer
          isActive={activeNavTab === label}
          label={label}
          submenu={submenu}
          // path={path}
          updateActiveNavTab={updateActiveNavTab}
          // updateAnchorEl={updateAnchorEl}
          // anchorEl={anchorEl}
          // clearAnchorEl={clearAnchorEl}
          // hoverAction={hoverAction}
        />
      )}
    </ListItem>
  );
};

export default PrimaryNavTab;

{
  /* upon rendering the NavLink with undefined routes (the routes which are not clickable)
      the NavLink is unable to support isActive 
      so those 4 links stay active
      which is why I have to maintain a state which tracks the current active tab
      */
}
{
  /* 
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
      */
}
