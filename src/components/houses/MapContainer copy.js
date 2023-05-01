import React, { useCallback, useMemo, useState } from 'react';
import { useRef } from 'react';
import Places from './Places';
import {
  Circle,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  MarkerClusterer,
} from '@react-google-maps/api';

const MapContainer = () => {
  const [office, setOffice] = useState();
  const [directions, setDirections] = useState();

  const mapRef = useRef();

  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const options = useMemo(
    () => ({
      mapId: '5760389ab4abcb9d',
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback(map => (mapRef.current = map), [mapRef]);
  const houses = useMemo(() => generateHouses(office), [office]);

  const fetchDirections = house => {
    if (!office) return;

    // eslint-disable-next-line no-undef
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: office,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
        }
      }
    );
  };

  return (
    <div className="container">
      <div className="controls">
        <h1>Commute?</h1>
        <Places
          setOffice={position => {
            setOffice(position);
            // setDirections(null);
            mapRef.current?.panTo(position);
          }}
        />

        {!office && <p>Enter the address of your office.</p>}
        {/* {directions && <Distance leg={directions.routes[0].legs[0]} />} */}
      </div>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: '#1976D2',
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {office && (
            <>
              <Marker
                position={office}
                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              />

              <MarkerClusterer>
                {clusterer =>
                  houses.map(house => (
                    <Marker
                      key={house.lat}
                      position={house}
                      clusterer={clusterer}
                      onClick={() => {
                        fetchDirections(house);
                      }}
                    />
                  ))
                }
              </MarkerClusterer>

              <Circle key={`15k`} center={office} radius={15000} options={closeOptions} />
              <Circle
                key={`30k`}
                center={office}
                radius={30000}
                options={middleOptions}
              />
              <Circle key={`45k`} center={office} radius={45000} options={farOptions} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

const generateHouses = position => {
  if (!position) return;

  const _houses = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: '#8BC34A',
  fillColor: '#8BC34A',
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: '#FBC02D',
  fillColor: '#FBC02D',
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: '#FF5252',
  fillColor: '#FF5252',
};

export default MapContainer;
