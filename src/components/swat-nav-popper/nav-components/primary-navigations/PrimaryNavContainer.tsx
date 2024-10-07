// import { useState, FC, ReactElement, MouseEvent } from "react";
import { FC, MouseEvent } from "react";
import { Box } from "@mui/material";
import PrimaryNavTextBox from "./PrimaryNavTextBox";
import { ISubMenuItem } from "../../models";
import MenuBoxPaper from "../common/MenuBoxPaper";
import PrimaryMenuItem from "./PrimaryMenuItem";
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
        <MenuBoxPaper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          clearAnchorEl={clearAnchorEl}
        >
          {submenu.map((eachMenuItem, index) => {
            // console.log(eachMenuItem?.submenu);
            return <PrimaryMenuItem key={index} eachMenuItem={eachMenuItem} />;
          })}
        </MenuBoxPaper>
      )}
    </Box>
  );
};

export default PrimaryNavContainer;
