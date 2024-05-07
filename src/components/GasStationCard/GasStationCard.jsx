import React from "react";

import aralLogo from "../../assets/Aral_Logo.svg.png";
import essoLogo from "../../assets/Esso_textlogo.svg.png";
import shellLogo from "../../assets/Shell_logo.svg.png";

import "./GasStationCard.css";

const GasStationCard = ({gasStation}) => {
	const getRandomGasStationProviderLogo = () => {
		const gasStationProviderLogos = [aralLogo, essoLogo, shellLogo];
		const getRandomInt = () => {
			return Math.floor(Math.random() * 100);
		}
		return gasStationProviderLogos[getRandomInt() % 3];
	}

	const getGasStationInformation = (gasStation) => {
		if (!gasStation) return [null, null];
		const address = gasStation.attributes.adresse;
		const streetNameAndNumber = address.slice(0, address.indexOf("(") - 1);
		const zipCode = address.slice(address.indexOf("(") + 1, -1);
		return [streetNameAndNumber, zipCode];
	}

	if (!gasStation) {
		return <div>Lade Tankstellen...</div>;
	}

	const gasStationInformation = gasStation ? getGasStationInformation(gasStation) : null;

	return (
		<div className="gas-station-card">
			{gasStation && (
				<div>
					<img className="gas-station-logo" alt="gas station provider" src={getRandomGasStationProviderLogo()} />
					<p>Straße & Hausnummer: {gasStationInformation[0]}</p>
					<p>PLZ: {gasStationInformation[1]}</p>
				</div>
			)}
		</div>
	)
}

export default GasStationCard;