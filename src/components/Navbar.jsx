import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();

	const handleMenuClick = e => {
		e.preventDefault();
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="navbar">
			<div className="logo"></div>
			<li className={`menu ${isMenuOpen ? "" : "hidden"}`}>
				<ul
					className={`menu-item ${
						location.pathname === "/" ? "selected" : ""
					}`}>
					<Link className="menu-link" to="/">
						Accueil
					</Link>
				</ul>
				<ul
					className={`menu-item ${
						["/tasks", "/new-task"].includes(location.pathname)
							? "selected"
							: ""
					}`}>
					<Link className="menu-link" to="/tasks">
						Gérer mes tâches
					</Link>
				</ul>
				<ul
					className={`menu-item ${
						["/lists", "/new-list"].includes(location.pathname)
							? "selected"
							: ""
					}`}>
					<Link className="menu-link" to="/lists">
						Gérer mes listes
					</Link>
				</ul>
			</li>
			<div className="icon-container">
				<span
					className="icon material-icons-outlined"
					onClick={handleMenuClick}>
					{isMenuOpen ? "close" : "menu"}
				</span>
			</div>
		</nav>
	);
};

export default Navbar;
