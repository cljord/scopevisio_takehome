import React from "react";
import Footer from "./components/Footer/Footer";
import GasStations from "./components/GasStations/GasStations";
import Hero from "./components/Hero/Hero";
import MapSection from "./components/MapSection/MapSection";
import Navbar from "./components/Navbar/Navbar";
import Title from "./components/Title/Title";

import { useState, useEffect } from "react";

const gasStationDataUrl =
  "https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid+is+not+null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson";

const App = () => {
  const [gasStationData, setGasStationData] = useState(null);
  const [currentGasStationId, setCurrentGasStationId] = useState(98);

  // Loads the data once
  useEffect(() => {
    fetch(gasStationDataUrl)
      .then((response) => response.json())
      .then((data) => setGasStationData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <div className="container">
        <Title
          id="map-id"
          subtitle="Für den schnellen Überblick"
          title="Die Karte"
        />
        <MapSection
          currentGasStationId={currentGasStationId}
          gasStationData={gasStationData}
          setCurrentGasStationId={setCurrentGasStationId}
        />
        <Title id="grid-id" subtitle="Für die Details" title="Die Tabelle" />
        <GasStations
          currentGasStationId={currentGasStationId}
          gasStationData={gasStationData}
          setCurrentGasStationId={setCurrentGasStationId}
        />
        <Footer />
      </div>
    </div>
  );
};

export default App;
