import React from "react";
import {useState, useEffect} from "react";
import GasStationCard from "../GasStationCard/GasStationCard";

import "./GasStations.css";

const GasStations = ({gasStationData}) => {
	const [processedGasStationData, setProcessedGasStationData] = useProcessGasStationData(gasStationData);

	if (!gasStationData) {
		return <div className="container" style={{textAlign: "center"}}>Lade Tankstellen...</div>;
	}

	const sortGasStations = (gasStationData, asc = true) => {
		const sortedGasStationData = [...gasStationData];
		if (asc) {
			sortedGasStationData.sort((a, b) => ("" + a.attributes.adresse).localeCompare(b.attributes.adresse))
		} else {
			sortedGasStationData.sort((a, b) => ("" + b.attributes.adresse).localeCompare(a.attributes.adresse))
		}
		setProcessedGasStationData(sortedGasStationData);
	}

	return (
		<div className="gas-stations container">
			<p style={{textAlign: "center"}}>Here be gas stations</p>
			<button onClick={() => sortGasStations(processedGasStationData)}>Hi</button>
			<button onClick={() => sortGasStations(processedGasStationData, false)}>Hi2</button>
			<div className="gas-stations-grid">
				{processedGasStationData && 
					processedGasStationData.map((gasStation) => (
						<GasStationCard key={gasStation.attributes.objectid} gasStation={gasStation}/>
				))}
			</div>
		</div>
	)
}

const useProcessGasStationData = (initialGasStationData) => {
	const [processedGasStationData, setProcessedGasStationData] = useState(null);

	useEffect(() => {
		if (initialGasStationData) setProcessedGasStationData(initialGasStationData.features);
	}, [initialGasStationData]);

	return [processedGasStationData, setProcessedGasStationData];
}

export default GasStations;