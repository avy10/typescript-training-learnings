import { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { MENU_DATA } from "./utils/menuData";
import DefaultNavPage from "./components/DefaultNavPage";
// import AppNavigation from "./components/swat-nav-vertical/AppNavigation";
import "./App.css";
import Navigation from "./components/swat-nav-vertical/AppNav";
interface ITertiaryNav {
	label: string;
	path: string;
}

interface ISecondaryNav {
	label: string;
	path: string;
	submenu?: ITertiaryNav[];
}

const App: FC = () => {
	console.log("refresh");
	return (
		<BrowserRouter>
			{/* <AppNavigation /> */}
			<Navigation />

			<Routes>
				<Route path="/" element={<Home />} />

				{MENU_DATA.map((primaryNavigation) => {
					if (primaryNavigation.path) {
						return (
							<Route
								key={primaryNavigation.path}
								path={primaryNavigation.path}
							>
								<Route
									index
									element={
										<DefaultNavPage
											pageName={primaryNavigation.label}
										/>
									}
								/>

								{primaryNavigation.submenu?.map(
									(secondaryNavigation: ISecondaryNav) => (
										<Route
											key={secondaryNavigation.path}
											path={secondaryNavigation.path}
										>
											<Route
												index
												element={
													<DefaultNavPage
														pageName={
															secondaryNavigation.label
														}
													/>
												}
											/>

											{secondaryNavigation.submenu?.map(
												(tertiaryNavigation) => (
													<Route
														key={
															tertiaryNavigation.path
														}
														path={
															tertiaryNavigation.path
														}
													>
														<Route
															index
															element={
																<DefaultNavPage
																	pageName={
																		tertiaryNavigation.label
																	}
																/>
															}
														/>
													</Route>
												)
											)}
										</Route>
									)
								)}
							</Route>
						);
					}
					return null; // Return null if path is not defined
				})}

				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
