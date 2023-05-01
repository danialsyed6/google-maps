import React, { useState } from 'react';
import SideBar from './SideBar';
import Map from './Map';
import { useRef } from 'react';

const MapContainer = () => {
  const [office, setOffice] = useState();
  const [directions, setDirections] = useState();

  const mapRef = useRef();

  // window.map = mapRef.current;

  const commonProps = {
    office,
    setOffice,
    directions,
    setDirections,
    mapRef,
  };

  return (
    <div className="container">
      <SideBar {...commonProps} />
      <Map {...commonProps} />
    </div>
  );
};

export default MapContainer;
