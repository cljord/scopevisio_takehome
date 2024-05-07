import React from "react";
import {useState} from "react";
import "./Navbar.css";

import logo from "../../assets/fuel-pump-white.png";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	window.addEventListener("scroll", (event) => {
		if (window.scrollY >= 100) {
			setIsScrolled(true)
		} else {
			setIsScrolled(false)
		}
	})

	return (
		<nav className={`container ${isScrolled && "dark-navbar"}`}>
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