import { FC, MouseEvent, useState } from "react";
import { MenuItem } from "@mui/material";
import { ISubMenuItem } from "../../models";
import { NavLink } from "react-router-dom";
import MenuBoxPaper from "../common/MenuBoxPaper";
interface IPrimaryMenuItemProps {
  eachMenuItem: ISubMenuItem;
}
const PrimaryMenuItem: FC<IPrimaryMenuItemProps> = ({ eachMenuItem }) => {
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
  return (
    <MenuItem
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
        {eachMenuItem?.submenu?.length && (
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
        )}
        {eachMenuItem?.submenu?.length && nestedAnchorEl && (
          <MenuBoxPaper
            open={Boolean(nestedAnchorEl)}
            anchorEl={nestedAnchorEl}
            clearAnchorEl={clearNestedAnchorEl}
            placementValue="right-start"
          >
            {eachMenuItem.submenu.map((nestedItem, index) => (
              <MenuItem
                key={index}
                sx={{
                  padding: 0,
                  borderBottom: "1px solid #b5b5b5",
                  margin: 0,
                }}
              >
                {nestedItem.label}
              </MenuItem>
            ))}
          </MenuBoxPaper>
        )}
      </NavLink>
    </MenuItem>
  );
};

export default PrimaryMenuItem;
