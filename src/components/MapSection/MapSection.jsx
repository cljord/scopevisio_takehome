import React, { useState, useEffect } from "react";
import Map, { Marker } from 'react-map-gl';

import GeocoderControl from "./geocoder-control.tsx";

import 'mapbox-gl/dist/mapbox-gl.css';
import "./MapSection.css";

const mapboxApiKey = "pk.eyJ1Ijoid2h5dW5lZCIsImEiOiJjbHcwYmFlZmsydnJzMmlxejB6eGwzMmFjIn0.BDEZaqFtOQtU2DHFsYM8pQ"

const MapSection = ({ gasStationData }) => {
	const [processedGasStationData, setProcessedGasStationData] = useProcessGasStationData(gasStationData);

  const [viewState, setViewState] = useState({
    latitude: 50.916095041454554,
    longitude: 6.960644911005172,
    zoom: 15,
  });

  return (
    processedGasStationData ? (
    <div className="map-container">
      <Map
        {...viewState}
        style={{width: 800, height: 600}}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={mapboxApiKey}
        onMove={event => setViewState(event.viewState)}
      >
        <GeocoderControl mapboxAccessToken={mapboxApiKey} position="top-right" />
        {processedGasStationData.map((gasStation) => (
        	<Marker
        		key={gasStation.attributes.objectid}
        		latitude={gasStation.geometry.y}
        		longitude={gasStation.geometry.x}
        	><div className="marker">{gasStation.attributes.objectid}</div>
        	</Marker>
        ))}
      </Map>
    </div> )
    : <div></div>
  );
};

const useProcessGasStationData = (initialGasStationData) => {
	const [processedGasStationData, setProcessedGasStationData] = useState(null);

	useEffect(() => {
		if (initialGasStationData) setProcessedGasStationData(initialGasStationData.features);
	}, [initialGasStationData]);

	return [processedGasStationData, setProcessedGasStationData];
}

export default MapSection;