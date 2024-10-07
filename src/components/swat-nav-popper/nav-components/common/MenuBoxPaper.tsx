import { FC, ReactNode } from "react";
import { MenuList, Popper, Paper, ClickAwayListener } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Placement } from "@popperjs/core";
interface IMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  clearAnchorEl: () => void;
  children: ReactNode;
  placementValue?: Placement; // type for the placement prop given by miui
}
const theme = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
          background: "#f4f6f9",
          color: "#000000",
          width: "218px",
          height: "37px",
          "&:hover": {
            textDecoration: "underline",
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
const MenuBoxPaper: FC<IMenuProps> = ({
  open,
  anchorEl,
  clearAnchorEl,
  placementValue = "bottom-start",
  children,
}) => {
  // console.log(anchorEl);
  const menuBoxClose = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation();
    clearAnchorEl();
  };

  return (
    <ThemeProvider theme={theme}>
      <Popper
        disablePortal
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        placement={placementValue}
        sx={{
          zIndex: 1000,
        }}
      >
        <Paper
          sx={{
            zIndex: 1001,

            boxShadow: "3px 2px 3px 0 #666",

            maxHeight: "500px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
          }}
        >
          <ClickAwayListener onClickAway={menuBoxClose}>
            <MenuList>{children}</MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </ThemeProvider>
  );
};

export default MenuBoxPaper;
/* return (
    <ThemeProvider theme={theme}>
      <Popper
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        placement="bottom-start"
      >
        <Paper>
          <ClickAwayListener onClickAway={menuBoxClose}>
            <MenuList autoFocusItem={open}>{children}</MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </ThemeProvider>
  ); */
