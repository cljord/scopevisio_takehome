import React from "react";
import {useState, useEffect} from "react";
import GasStationCard from "../GasStationCard/GasStationCard";
import Pagination from "../Pagination/Pagination";

import "./GasStations.css";

const GasStations = ({gasStationData}) => {
	const [processedGasStationData, setProcessedGasStationData] = useProcessGasStationData(gasStationData);
	const [searchString, setSearchString] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 12;

	if (!gasStationData) {
		return <div className="container" style={{textAlign: "center"}}>Lade Tankstellen...</div>;
	}

	const sortGasStations = (gasStationData, asc = true) => {
		const sortedGasStationData = [...gasStationData];
		if (asc) {
			sortedGasStationData.sort((a, b) =>
				("" + a.attributes.adresse).localeCompare(b.attributes.adresse)
				)
		} else {
			sortedGasStationData.sort((a, b) =>
				("" + b.attributes.adresse).localeCompare(a.attributes.adresse)
				)
		}
		setProcessedGasStationData(sortedGasStationData);
	}

	const filterSearchedGasStations = (gasStationData) => {
		if (!gasStationData || gasStationData.length === 0) {
			return <div>Keine Tankstellen mit dieser Adresse gefunden</div>
		}
		const searchedGasStationData = gasStationData.filter((gasStation) => gasStation.attributes.adresse.toLowerCase().includes(searchString))
		return searchedGasStationData
	}

	const renderGasStationCards = (gasStationData) => {
		if (!gasStationData || gasStationData.length === 0) {
			return <div>Keine Tankstellen gefunden</div>
		}

		const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentGasStations = gasStationData.slice(firstPostIndex, lastPostIndex);
		
		return currentGasStations.map((gasStation) => 
			<GasStationCard gasStation={gasStation} key={gasStation.attributes.objectid} />
		)
	}

	return (
		<div className="gas-stations">
			<p style={{textAlign: "center"}}>Here be gas stations</p>
			<button onClick={() => sortGasStations(processedGasStationData)} type="button">Aufsteigende Sortierung</button>
			<button onClick={() => sortGasStations(processedGasStationData, false)} type="button">Absteigende Sortierung</button>
			<input name="search-input" onChange={(e) => setSearchString(e.target.value.toLowerCase())}/>
			<div className="gas-stations-grid">
				{processedGasStationData ? renderGasStationCards(filterSearchedGasStations(processedGasStationData)) : <div>Keine Tankstellen gefunden</div>
				}
			</div>
			{processedGasStationData ?
			  <Pagination currentPage={currentPage} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} totalPosts={processedGasStationData.length} />
			  : <div></div>
			}
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