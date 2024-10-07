import { FC, ReactNode } from "react";
import { MenuList, Popper, Paper, ClickAwayListener } from "@mui/material";

interface IMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  clearAnchorEl: () => void;
  children: ReactNode;
}

const MenuBoxPaper: FC<IMenuProps> = ({
  open,
  anchorEl,
  clearAnchorEl,
  children,
}) => {
  console.log(anchorEl);
  const menuBoxClose = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation();
    clearAnchorEl();
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      role={undefined}
      placement="bottom-start"
      // transition
      // disablePortal
    >
      <Paper>
        <ClickAwayListener onClickAway={menuBoxClose}>
          <MenuList autoFocusItem={open}>{children}</MenuList>
        </ClickAwayListener>
      </Paper>
    </Popper>
  );
};

export default MenuBoxPaper;
