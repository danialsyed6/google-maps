import React from 'react';
import Places from './Places';

const SideBar = ({ mapRef, office, setOffice, setDirections }) => {
  return (
    <div className="controls">
      <h1>Commute?</h1>
      <Places
        setOffice={position => {
          setOffice(position);
          setDirections(null);
          mapRef.current?.panTo(position);
        }}
      />

      {!office && <p>Enter the address of your office.</p>}
      {/* {directions && <Distance leg={directions.routes[0].legs[0]} />} */}
    </div>
  );
};

export default SideBar;
