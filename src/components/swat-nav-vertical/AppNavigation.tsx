import { useState, KeyboardEvent, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import styles from "./AppNavigation.module.css";
import { MENU_DATA } from "../../utils/menuData";
// Interfaces
interface INestedMenuItem {
	label: string;
	path: string;
}

interface ISubMenuItem {
	label: string;
	submenu?: INestedMenuItem[];
	path?: string;
}

interface IMenuItem {
	label: string;
	submenu?: ISubMenuItem[];
	path?: string;
}
// ---

const AppNavigation: FC = () => {
	return (
		<nav aria-label="Main navigation" className={styles.mainNav}>
			{MENU_DATA.map((menuItem) => (
				<PrimaryNavTab key={menuItem.label} menuItem={menuItem} />
			))}
		</nav>
	);
};

export default AppNavigation;

const PrimaryNavTab: FC<{ menuItem: IMenuItem }> = ({ menuItem }) => {
	const navigate = useNavigate();
	const [open, setOpen] = useState<boolean>(false);
	const handleHover = () => setOpen(true);
	const handleLeave = () => setOpen(false);
	const handleClick = (path: string) => {
		if (path !== "undefined") {
			navigate(`/${path}`);
		}
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		e.stopPropagation();
		if (e.key === "Enter" || e.key === " ") {
			setOpen((prev) => !prev);
		} else if (e.key === "Escape") {
			setOpen(false);
		}
	};
	return (
		<Box
			// component="button" // review
			className={styles.primaryNavTab}
			aria-haspopup="true"
			aria-expanded={open}
			onMouseOver={handleHover}
			onMouseLeave={handleLeave}
			onClick={() => handleClick(menuItem.path)}
			onKeyDown={handleKeyPress}
			tabIndex={0}
			aria-controls={`submenu-${menuItem.label}`}
			aria-label={`Navigation item: ${menuItem.label}`}
			sx={{
				display: "flex",
				"column-gap": "0px",
				background: "#09436d",
				margin: "0",
				padding: "10px",
				"font-weight": "bold",
				"font-size": "14px",
			}}
		>
			<Typography>{menuItem.label}</Typography>
			{open && menuItem.submenu && <SubMenu submenu={menuItem.submenu} />}
		</Box>
	);
};

const SubMenu: React.FC<{ submenu: ISubMenuItem[] }> = ({ submenu }) => {
	const [activeIndex, setActiveIndex] = useState(-1);

	const handleKeyDown = (e: KeyboardEvent) => {
		const totalItems = submenu.length;
		e.stopPropagation();
		switch (e.key) {
			case "ArrowDown":
				setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems);
				break;
			case "ArrowUp":
				setActiveIndex(
					(prevIndex) => (prevIndex - 1 + totalItems) % totalItems
				);
				break;
			case "Escape":
				setActiveIndex(-1);
				break;
			default:
				break;
		}
	};

	return (
		<Box
			role="menu"
			aria-label={`Submenu for navigation`}
			position="relative"
			border="2px solid black"
			aria-labelledby="submenu"
		>
			{/* {submenu.map((subItem, index) => (
				<SingleSubMenu
					key={subItem.label}
					subItem={subItem}
					active={activeIndex === index}
					handleKeyDown={(e) => handleKeyDown(e)}
				/>
			))} */}
		</Box>
	);
};
