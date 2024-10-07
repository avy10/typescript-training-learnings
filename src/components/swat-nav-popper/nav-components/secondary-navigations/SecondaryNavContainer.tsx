import { FC, useState, MouseEvent } from "react";
import { Box, MenuItem } from "@mui/material";

const SecondaryNavContainer: FC = () => {
  return (
    <Box
      onClick={(event: MouseEvent<HTMLElement>) => {
        if (updateNestedAnchorEl) {
          updateNestedAnchorEl(event);
        }
      }}
      onMouseEnter={nestedHoverAction}
      onMouseLeave={clearNestedAnchorEl}
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
      {" "}
    </Box>
  );
};

export default SecondaryNavContainer;
