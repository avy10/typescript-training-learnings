// import { FC } from "react";
import { useState, FC } from "react"; // 1
// import { MENU_DATA } from "../../utils/menuData"
import { MENU_DATA } from "./models/menuData";
import styles from "./AppNavigation.module.css";
import PrimaryNavTab from "./nav-components/primary-navigations/PrimaryNavTab";
import { Typography } from "@mui/material";
import List from "@mui/material/List";
import OfficeSelections from "./nav-components/selection/OfficeSelections";

const AppNavPopper: FC = () => {
  const [activeNavTab, setActiveNavTab] = useState<string>("swat/my-inbox");

  const updateActiveNavTab = (newRoute: string) => {
    setActiveNavTab(newRoute);
  }; //1
  return (
    <nav aria-labelledby="mainmenulabel" className={styles.mainNav}>
      <Typography
        variant="h2"
        id="mainmenulabel"
        sx={{
          display: "none",
        }}
      >
        Main Menu
      </Typography>
      <List
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          columnGap: "0px",
          padding: 0,
        }}
      >
        {MENU_DATA.map((menuItem) => (
          <PrimaryNavTab
            activeNavTab={activeNavTab}
            updateActiveNavTab={updateActiveNavTab}
            menuItem={menuItem}
            key={menuItem.label}
          />
        ))}
      </List>
      <OfficeSelections />
    </nav>
  );
};

export default AppNavPopper;
