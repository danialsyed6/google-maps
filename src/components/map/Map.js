import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-maps-react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';

const Map = () => {
  const [map, setMap] = useState(null);
  const [google, setGoogle] = useState(null);
  const [viewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 11,
  });

  const onMapLoad = (mapProps, map) => {
    setMap(map);
    setGoogle(mapProps.maps);
  };

  useEffect(() => {
    if (google) {
      const directionsService = new google.DirectionsService();
      const directionsRenderer = new google.DirectionsRenderer();
      directionsRenderer.setMap(map);
      const start = new google.LatLng(37.7749, -122.4194);
      const end = new google.LatLng(37.7916, -122.4139);
      const request = {
        origin: start,
        destination: end,
        travelMode: google.TravelMode.DRIVING,
      };
      directionsService.route(request, (result, status) => {
        if (status === google.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        }
      });
    }
  }, [google, map]);

  useEffect(() => {
    console.log('map', map);
  }, [map]);
  useEffect(() => {
    console.log('google', google);
  }, [google]);

  return (
    <div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBa1O7w8n-0Rf1PshL2MhvBuhtX6_m6peg' }}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => onMapLoad({ maps }, map)}
        google={google}
      >
        {map && (
          <DeckGL
            viewState={viewport}
            layers={[
              new ScatterplotLayer({
                id: 'scatter-plot',
                data: [{ position: [-122.4194, 37.7749] }],
                getPosition: d => d.position,
                getRadius: 1000,
                getColor: [255, 0, 0],
              }),
            ]}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
