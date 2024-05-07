import React from "react";
import "./Navbar.css";

import logo from "../../assets/fuel-pump-white.png";

const Navbar = () => {
	return (
		<nav className="container">
			<img className="logo" src={logo} alt="fuel pump" />
			<ul>
				<li>Home</li>
				<li>Karte</li>
				<li>Tankstellen</li>
				<li>Kontakt</li>
			</ul>
		</nav>
	)
}

export default Navbar;