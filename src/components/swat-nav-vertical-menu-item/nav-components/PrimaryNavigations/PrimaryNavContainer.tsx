// import { useState, FC, ReactElement, MouseEvent } from "react";
import { FC, MouseEvent } from "react";
import { Box, MenuItem } from "@mui/material";
import PrimaryNavTextBox from "./PrimaryNavTextBox";
import { ISubMenuItem } from "../../models";
import MenuBox from "../common/MenuBox";
import { NavLink } from "react-router-dom";

interface IPrimaryNavContainerProps {
  isActive: boolean;
  label: string;
  //   path: string;

  updateActiveNavTab: (path: string) => void;
  updateAnchorEl?: (event: MouseEvent<HTMLElement>) => void;

  anchorEl: null | HTMLElement;
  clearAnchorEl: () => void;

  submenu: ISubMenuItem[] | undefined;
  hoverAction?: (event: MouseEvent<HTMLElement>) => void;
}

const PrimaryNavContainer: FC<IPrimaryNavContainerProps> = ({
  isActive,
  label,

  updateActiveNavTab,
  updateAnchorEl,
  anchorEl,
  clearAnchorEl,
  submenu,
  hoverAction,
}) => {
  return (
    <Box
      onClick={(event: MouseEvent<HTMLElement>) => {
        updateActiveNavTab(label);
        if (updateAnchorEl) {
          updateAnchorEl(event);
        }
      }}
      onMouseOver={hoverAction}
      onMouseLeave={clearAnchorEl}
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
      {submenu?.length && (
        <MenuBox anchorEl={anchorEl} clearAnchorEl={clearAnchorEl}>
          {submenu.map((eachMenuItem, index) => {
            // console.log(eachMenuItem);
            return (
              <MenuItem
                key={index}
                sx={{
                  padding: 0,
                  borderBottom: "1px solid #b5b5b5",
                  margin: 0,
                }}
              >
                <NavLink
                  to={eachMenuItem.path || "swat/watchlist"}
                  style={{
                    padding: "10px",
                    width: "100%",
                  }}
                >
                  {eachMenuItem.label}
                </NavLink>
              </MenuItem>
            );
          })}
        </MenuBox>
      )}
    </Box>
  );
};

export default PrimaryNavContainer;
/* 
<div>
            <MenuItem
              onClick={(event: MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                clearAnchorEl();
              }}
            >
              Profile Profile Profile Profile
            </MenuItem>
            <MenuItem
              onClick={(event: MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                clearAnchorEl();
              }}
            >
              My account Profile Profile
            </MenuItem>
            <MenuItem
              onClick={(event: MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                clearAnchorEl();
              }}
            >
              Logout Profile Profile Profile
            </MenuItem>
          </div>
*/
