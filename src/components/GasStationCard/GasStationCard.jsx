import React from "react";

import "./GasStationCard.css";

const GasStationCard = ({gasStation}) => {
	return (
		<div className="gas-station-card">
			{gasStation && gasStation.attributes.adresse}
		</div>
	)
}

export default GasStationCard;