// import { useState, FC, ReactElement, MouseEvent } from "react";
import { FC, MouseEvent, useEffect, useState } from "react";
import { Box, MenuItem } from "@mui/material";
import PrimaryNavTextBox from "./PrimaryNavTextBox";
import { ISubMenuItem } from "../../models";
import { NavLink } from "react-router-dom";
import MenuBoxPaper from "../common/MenuBoxPaper";
interface IPrimaryNavContainerProps {
  isActive: boolean;
  label: string;

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
  const [nestedAnchorEl, setNestedAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const updateNestedAnchorEl = (event: MouseEvent<HTMLElement>) => {
    setNestedAnchorEl(event.currentTarget);
    // console.log(event.currentTarget);
  };
  const clearNestedAnchorEl = () => {
    setNestedAnchorEl(null);
  };

  const nestedHoverAction = (event: MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);
    setNestedAnchorEl(event.currentTarget);
  };
  // useEffect(() => {
  //   console.log(nestedAnchorEl);
  // }, [nestedAnchorEl]);
  return (
    <Box
      onClick={(event: MouseEvent<HTMLElement>) => {
        updateActiveNavTab(label);
        if (updateAnchorEl) {
          updateAnchorEl(event);
        }
      }}
      onMouseOver={hoverAction}
      // onMouseLeave={clearAnchorEl}
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
        <MenuBoxPaper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          clearAnchorEl={clearAnchorEl}
        >
          {submenu.map((eachMenuItem, index) => {
            // console.log(eachMenuItem?.submenu);
            return (
              <MenuItem
                key={index}
                sx={{
                  padding: 0,
                  borderBottom: "1px solid #b5b5b5",
                  margin: 0,
                }}
                onMouseOver={(event: MouseEvent<HTMLElement>) => {
                  if (!eachMenuItem?.submenu?.length) {
                    return;
                  }
                  event.stopPropagation();
                  nestedHoverAction(event);
                }}
                onMouseLeave={() => {
                  // if (!eachMenuItem?.submenu?.length) {
                  //   return;
                  // }
                  clearNestedAnchorEl();
                }}
              >
                <NavLink
                  to={eachMenuItem.path || "swat/watchlist"}
                  style={{
                    padding: "10px",
                    width: "100%",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {eachMenuItem.label}
                  {/* {eachMenuItem?.submenu?.length && (
                    <MenuBoxPaper
                      open={Boolean(nestedAnchorEl)}
                      anchorEl={nestedAnchorEl}
                      clearAnchorEl={clearNestedAnchorEl}
                      placementValue="right-start"
                    >
                      {eachMenuItem.submenu.map((nestedMenuItem, index) => {
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
                              to={nestedMenuItem.path || "swat/watchlist"}
                              style={{
                                padding: "10px",
                                width: "100%",
                                fontSize: "14px",
                                fontWeight: 500,
                              }}
                            >
                              {nestedMenuItem.label}
                            </NavLink>
                          </MenuItem>
                        );
                      })}
                    </MenuBoxPaper>
                  )} */}
                  {eachMenuItem?.submenu?.length &&
                    nestedAnchorEl &&
                    console.log("There is subarray", eachMenuItem.submenu)}
                </NavLink>
              </MenuItem>
            );
          })}
        </MenuBoxPaper>
      )}
    </Box>
  );
};

export default PrimaryNavContainer;
