import { useState, KeyboardEvent, FC } from "react";
import { Box, Typography } from "@mui/material";
import { MENU_DATA } from "../../utils/menuData";
import styles from "./AppNavigation.module.css";
// Define the type for each menu item
interface INestedMenuItem {
	label: string;
	path: string;
}

interface ISubMenuItem {
	label: string;
	submenu?: INestedMenuItem[]; // Optional submenu for deeper levels
	path?: string; // Some items may not have a path
}

interface IMenuItem {
	label: string;
	submenu?: ISubMenuItem[]; // Optional submenu for secondary levels
	path?: string;
}

const Navigation: FC = () => {
	const [activeNavTab, setActiveNavTab] = useState<string>("swat/my-inbox");
	return (
		<nav aria-label="Main navigation" className={styles.mainNav}>
			{MENU_DATA.map((menuItem) => (
				<SingleNavTab
					key={menuItem.label}
					menuItem={menuItem}
					activeNavTab={activeNavTab}
				/>
			))}
		</nav>
	);
};

const SingleNavTab: React.FC<{ menuItem: IMenuItem; activeNavTab: string }> = ({
	menuItem,
	activeNavTab,
}) => {
	const [open, setOpen] = useState(false);
	const isActive = activeNavTab === menuItem.path;
	const handleHover = () => setOpen(true);
	const handleLeave = () => setOpen(false);
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
			component="button"
			className={styles.primaryNavTab}
			aria-haspopup="true"
			aria-expanded={open}
			onMouseOver={handleHover}
			onMouseLeave={handleLeave}
			onKeyDown={handleKeyPress}
			tabIndex={0}
			aria-controls={`submenu-${menuItem.label}`}
			aria-label={`Navigation item: ${menuItem.label}`}
			sx={{
				position: "relative",
				display: "flex",
				columnGap: "0px",
				background: isActive ? "white" : "#09436d",
				margin: "0",
				padding: "15px",
				color: isActive ? "#09436d" : "white",
				border: "none",
				borderRight: "1px solid #295b80",
				borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
				cursor: "pointer",
				"&:hover": {
					background: "white", // Change background on hover
					color: "#09436d", // Change text color on hover
				},
			}}
		>
			<Typography
				sx={{
					fontWeight: "bold",
					fontSize: "14px",
				}}
			>
				{menuItem.label}
			</Typography>
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
			aria-labelledby="submenu"
			sx={{
				position: "absolute",
				top: "41px",
				left: "-11px",
				width: "max-content", // works well to adjust the box size according to text length, but makes it difficult to manage the nested menu
				width: "280px", //makes it easier to control placement of nested menu if I have a fixed value
				textAlign: "left",
				padding: "10px",
			}}
		>
			{submenu.map((subItem, index) => (
				<SingleSubMenu
					key={subItem.label}
					subItem={subItem}
					active={activeIndex === index}
					handleKeyDown={(e) => handleKeyDown(e)}
				/>
			))}
		</Box>
	);
};

const SingleSubMenu: React.FC<{
	subItem: ISubMenuItem;
	active: boolean;
	handleKeyDown: (e: KeyboardEvent) => void;
}> = ({ subItem, active, handleKeyDown }) => {
	const [showLevelTwoMenu, setShowLevelTwoMenu] = useState(false);

	const handleHover = () => setShowLevelTwoMenu(true);
	const handleLeave = () => setShowLevelTwoMenu(false);
	const handleKeyPress = (e: KeyboardEvent) => {
		e.stopPropagation();
		if (e.key === "Enter" || e.key === " ") {
			setShowLevelTwoMenu((prev) => !prev);
		} else if (e.key === "Escape") {
			setShowLevelTwoMenu(false);
		}
	};

	return (
		<Box
			role="menuitem"
			tabIndex={0}
			aria-haspopup="true"
			aria-expanded={showLevelTwoMenu}
			aria-label={`Submenu item: ${subItem.label}`}
			onMouseOver={handleHover}
			onMouseLeave={handleLeave}
			onKeyDown={handleKeyDown}
			onKeyPress={handleKeyPress}
			sx={{
				padding: "3px",
				position: "relative",
				backgroundColor: "white",
				color: "red",
			}}
		>
			<Typography
				sx={{
					fontWeight: "bold",
					fontSize: "16px",
					border: "1px solid black",
					padding: "10px 5px",
				}}
			>
				{subItem.label}
			</Typography>
			{showLevelTwoMenu && subItem.submenu && (
				<LevelTwoSubMenu
					submenu={subItem.submenu}
					setShowLevelTwoMenu={setShowLevelTwoMenu}
				/>
			)}
		</Box>
	);
};

const LevelTwoSubMenu: React.FC<{
	submenu: INestedMenuItem[];
	setShowLevelTwoMenu: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ submenu, setShowLevelTwoMenu }) => {
	const [activeIndex, setActiveIndex] = useState(-1);

	const handleKeyDown = (e: KeyboardEvent) => {
		const totalItems = submenu.length;
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
				setShowLevelTwoMenu(false);
				break;
			default:
				break;
		}
	};

	return (
		<Box
			role="menu"
			sx={{
				background: "aqua",
				position: "absolute",
				zIndex: 3,
				top: 0,
				left: "260px",
				width: "max-content",
				padding: "5px 10px",
			}}
		>
			{submenu.map((nestedItem, index) => (
				<Typography
					key={`${nestedItem.label}-${index}`}
					role="menuitem"
					tabIndex={0}
					onKeyDown={(e) => {
						e.stopPropagation();
						handleKeyDown(e);
					}}
					aria-label={`${nestedItem.label} item`}
					style={{
						backgroundColor:
							activeIndex === index ? "#f0f0f0" : "transparent",
					}}
					sx={{
						fontWeight: "bold",
						fontSize: "16px",
						border: "1px solid blue",
						padding: "10px 5px",
					}}
				>
					{nestedItem.label}
				</Typography>
			))}
		</Box>
	);
};

export default Navigation;
