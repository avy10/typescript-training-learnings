import { Menu } from "@mui/material";

interface MenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  children: React.ReactNode;
}
const MenuBox = (props: MenuProps) => {
  const { anchorEl, onClose, children } = props;
  return (
    <Menu
      className="SideMenu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {children}
    </Menu>
  );
};

export default MenuBox;
