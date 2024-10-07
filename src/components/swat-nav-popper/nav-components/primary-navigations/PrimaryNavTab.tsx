import { useState, FC, ReactElement, MouseEvent } from "react";
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
  const { path, label, submenu } = menuItem;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const updateAnchorEl = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // console.log(event.currentTarget);
  };
  const clearAnchorEl = () => {
    setAnchorEl(null);
  };

  const hoverAction = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <ListItem
      sx={{
        padding: 0,
        width: "fit-content",
      }}
    >
      {path !== undefined ? (
        <NavLink
          to={path}
          onClick={(event: MouseEvent<HTMLElement>) => updateAnchorEl(event)}
        >
          {({ isActive }) => (
            <PrimaryNavContainer
              isActive={activeNavTab === label && isActive}
              label={label}
              submenu={submenu}
              // path={path}
              updateActiveNavTab={updateActiveNavTab}
              anchorEl={anchorEl}
              clearAnchorEl={clearAnchorEl}
              hoverAction={hoverAction}
            />
          )}
        </NavLink>
      ) : (
        <PrimaryNavContainer
          isActive={activeNavTab === label}
          label={label}
          submenu={submenu}
          updateActiveNavTab={updateActiveNavTab}
          updateAnchorEl={updateAnchorEl}
          anchorEl={anchorEl}
          clearAnchorEl={clearAnchorEl}
          hoverAction={hoverAction}
        />
      )}
    </ListItem>
  );
};

export default PrimaryNavTab;
