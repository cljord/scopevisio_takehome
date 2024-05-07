import React from "react";
import {useState, useEffect} from "react";
import GasStationCard from "../GasStationCard/GasStationCard";

import "./GasStations.css";

const GasStations = ({gasStationData}) => {
	const [processedGasStationData, setProcessedGasStationData] = useProcessGasStationData(gasStationData);


	return (
		<div className="gas-stations container">
			<p style={{textAlign: "center"}}>Here be gas stations</p>
			<div className="gas-stations-grid">
				{processedGasStationData && 
					processedGasStationData.map((gasStation) => (
						<GasStationCard key={gasStation.attributes.objectid} gasStation={gasStation}/>
				))}
			</div>
		</div>
	)
}

export default GasStations;

const useProcessGasStationData = (initialGasStationData) => {
	const [processedGasStationData, setProcessedGasStationData] = useState(null);

	useEffect(() => {
		if (initialGasStationData) setProcessedGasStationData(initialGasStationData.features);
	}, [initialGasStationData]);

	return [processedGasStationData, setProcessedGasStationData];
}