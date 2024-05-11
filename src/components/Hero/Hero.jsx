import React from "react";

import "./Hero.css";

const Hero = () => {
	return (
		<div className="hero" id="hero-id">
			<div className="hero-text">
				<h1>Tankstellenfinder</h1>
				<p>Ihr zuverlässiger Tankstellenfinder in und um Köln</p>
			</div>
			<div className="hero-site-links">
				<a href="#map-id">Zur Karte</a>
				<a href="#grid-id">Zur Tabelle</a>
			</div>
		</div>
	)
}

export default Hero;