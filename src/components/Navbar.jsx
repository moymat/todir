import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { pathname } = useLocation();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="navbar">
			<div className="nav-container">
				<div className="logo"></div>
				<ul className={`menu ${isMenuOpen ? "" : "hidden"}`}>
					<li className={`menu-item ${pathname === "/" ? "selected" : ""}`}>
						<Link onClick={toggleMenu} className="menu-link" to="/">
							Accueil
						</Link>
					</li>
					<li
						className={`menu-item ${
							["/tasks", "/new-task"].includes(pathname) ? "selected" : ""
						}`}>
						<Link onClick={toggleMenu} className="menu-link" to="/tasks">
							Gérer mes tâches
						</Link>
					</li>
					<li
						className={`menu-item ${
							["/lists", "/new-list"].includes(pathname) ? "selected" : ""
						}`}>
						<Link onClick={toggleMenu} className="menu-link" to="/lists">
							Gérer mes listes
						</Link>
					</li>
				</ul>
				<div className="icon-container">
					<span className="icon material-icons" onClick={toggleMenu}>
						{isMenuOpen ? "close" : "menu"}
					</span>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
