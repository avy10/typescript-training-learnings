import { useState, FC } from "react";
import { MENU_DATA } from "../../utils/menuData";
import styles from "./AppNavigation.module.css";

import PrimaryNavTab from "./nav-components/PrimaryNavTab";
const AppNav: FC = () => {
  const [activeNavTab, setActiveNavTab] = useState<string>("swat/my-inbox");
  const updateActiveNavTab = (newRoute: string) => {
    setActiveNavTab(newRoute);
  };
  return (
    <nav aria-labelledby="mainmenulabel" className={styles.mainNav}>
      <h2 id="mainmenulabel" className="visuallyhidden">
        Main Menu
      </h2>
      {MENU_DATA.map((menuItem) => (
        <PrimaryNavTab
          key={menuItem.label}
          menuItem={menuItem}
          activeNavTab={activeNavTab}
          updateActiveNavTab={updateActiveNavTab}
        />
      ))}
    </nav>
  );
};

export default AppNav;
