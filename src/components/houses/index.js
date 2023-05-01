import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from './MapContainer';

const Houses = () => {
  const { loadError, isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBa1O7w8n-0Rf1PshL2MhvBuhtX6_m6peg',
    libraries: ['places'],
  });

  if (loadError) return <div>Error: {loadError}</div>;

  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
};

export default Houses;
