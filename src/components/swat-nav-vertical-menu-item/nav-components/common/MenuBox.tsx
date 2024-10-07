import { FC, MouseEvent, ReactNode } from "react";
import { Menu } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          paddingTop: 0,
          paddingBottom: 0,
          background: "#f4f6f9",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
          background: "#f4f6f9",
          width: "218px",

          "&:hover": {
            backgroundColor: "transparent",
            color: "#000000",
            textDecoration: "underline",
          },
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
  },
});

interface IMenuProps {
  anchorEl: HTMLElement | null;
  clearAnchorEl: () => void;
  children: ReactNode;
}
const MenuBox: FC<IMenuProps> = ({
  anchorEl,
  clearAnchorEl,

  children,
}) => {
  const menuBoxClose = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log("closing menu box");
    clearAnchorEl();
  };
  return (
    <ThemeProvider theme={theme}>
      <Menu
        className="SideMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={menuBoxClose}
        disablePortal
        disableScrollLock
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        MenuListProps={{ onMouseLeave: menuBoxClose }}
      >
        {children}
      </Menu>
    </ThemeProvider>
  );
};

export default MenuBox;
