import React, { useState, useEffect } from "react";
import Map, { Marker } from 'react-map-gl';

import GeocoderControl from "./geocoder-control.tsx";

import pump from "../../assets/fuel-pump-black.png";

import 'mapbox-gl/dist/mapbox-gl.css';
import "./MapSection.css";

const mapboxApiKey = process.env.REACT_APP_MAPBOX_KEY

const MapSection = ({ gasStationData, currentGasStationId, setCurrentGasStationId }) => {
	const [processedGasStationData] = useProcessGasStationData(gasStationData);

  const [viewState, setViewState] = useState({
    latitude: 50.916095041454554,
    longitude: 6.960644911005172,
    zoom: 11,
  });

  return (
    processedGasStationData ? (
    <div className="map-container">
      <Map
        {...viewState}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={mapboxApiKey}
        onMove={event => setViewState(event.viewState)}
        style={{width: 800, height: 600}}
      >
        <GeocoderControl mapboxAccessToken={mapboxApiKey} position="top-right" />
        {processedGasStationData.map((gasStation) => (
        	<Marker
            key={gasStation.attributes.objectid}
            latitude={gasStation.geometry.y}
            longitude={gasStation.geometry.x}
        		onClick={() => setCurrentGasStationId(gasStation.attributes.objectid)}
        	>
        	<img alt="fuel pump" className={gasStation.attributes.objectid === currentGasStationId ? "active" : ""} src={pump} />
        	</Marker>
        ))}
      </Map>
    </div> )
    : <div/>
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