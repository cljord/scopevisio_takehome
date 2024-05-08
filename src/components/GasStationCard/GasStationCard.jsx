import React from "react";

import aralLogo from "../../assets/Aral_Logo.svg.png";
import essoLogo from "../../assets/Esso_textlogo.svg.png";
import shellLogo from "../../assets/Shell_logo.svg.png";

import "./GasStationCard.css";

const GasStationCard = ({gasStation}) => {

	const getRandomGasStationProviderLogo = () => {
		// To make the site a bite more colourful, random logos of
		// gas stations are added. A full version would prbbly have these supplied
		const gasStationProviderLogos = [aralLogo, essoLogo, shellLogo];
		const getRandomInt = () => {
			return Math.floor(Math.random() * 100);
		}
		return gasStationProviderLogos[getRandomInt() % 3];
	}

	const getGasStationInformation = (gasStation) => {
		if (!gasStation) return [null, null, null];
		const address = gasStation.attributes.adresse;
		// Address is saved as "Streetname Nr. (Zipcode Areaname)"
		// Following code just extracts the Streetname Nr. and (Zipcode Areaname)
		const streetNameAndNumber = address.slice(0, address.indexOf("(") - 1);
		const zipCode = address.slice(address.indexOf("(") + 1, -1);
		const gasStationId = gasStation.attributes.objectid;
		return [streetNameAndNumber, zipCode, gasStationId];
	}

	if (!gasStation) {
		return <div>Lade Tankstellen...</div>;
	}

	const gasStationInformation = getGasStationInformation(gasStation);

	return (
		<div className="gas-station-card">
				<div className="content">
					<div className="header">
						<img alt="gas station provider" className="gas-station-logo" src={getRandomGasStationProviderLogo()} />
						<h3>Tankstelle Nr. {gasStationInformation[2]}</h3>
					</div>
					<div className="details">
						<p>Straße & Hausnummer: {gasStationInformation[0]}</p>
						<p>PLZ: {gasStationInformation[1]}</p>
					</div>
				</div>
		</div>
	)
}

export default GasStationCard;