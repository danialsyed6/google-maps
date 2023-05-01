import { Circle, DirectionsRenderer } from '@react-google-maps/api';
import { MarkerClusterer } from '@react-google-maps/api';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { DeckGL, ScatterplotLayer } from 'deck.gl';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';

const Map = ({ mapRef, office, setOffice, directions, setDirections }) => {
  // const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const center = useMemo(() => ({ lat: 37.774929, lng: -122.419416 }), []);
  const options = useMemo(
    () => ({
      mapId: '5760389ab4abcb9d',
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback(
    map => {
      mapRef.current = map;
      setMap(map);
    },
    [mapRef]
  );
  const houses = useMemo(() => generateHouses(office), [office]);

  const [map, setMap] = useState(null);

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

  // useEffect(() => {
  //   const it = setInterval(() => {
  //     console.log(11, office?.lat);
  //     if (office?.lat === 42.9849233)
  //       setOffice({
  //         lat: 43.4516395,
  //         lng: -80.4925337,
  //       });
  //     else
  //       setOffice({
  //         lat: 42.9849233,
  //         lng: -81.2452768,
  //       });
  //   }, 10000);

  //   return () => clearInterval(it);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [office]);

  useEffect(() => {
    // console.log(office);
  }, [office]);

  const deckOverlay = useRef(null);

  useEffect(() => {
    // console.log(mapRef.current);
    // if (mapRef.current) {
    //   console.log(1);

    //   deckOverlay.current = new GoogleMapsOverlay({
    //     layers: [
    //       new ScatterplotLayer({
    //         id: 'ScatterplotLayer',
    //         getFillColor: [255, 140, 0],
    //         getLineColor: [0, 0, 0],
    //         getPosition: [-80.4925337, 43.4516395],
    //         getRadius: d => 50,
    //         lineWidthMinPixels: 1,
    //         radiusMaxPixels: 100,
    //         radiusMinPixels: 1,
    //         radiusScale: 6,
    //         stroked: true,
    //         opacity: 0.8,
    //       }),
    //     ],
    //     map: mapRef,
    //   });

    //   console.log(deckOverlay.current);
    // }

    const map = mapRef.current;

    console.log(1, map);

    if (!map) return;

    const overlay = new GoogleMapsOverlay({
      layers: [],
    });
    deckOverlay.current = overlay;

    const data = [
      { position: [-122.419416, 37.774929], size: 100 },
      { position: [-122.416557, 37.778443], size: 100 },
      { position: [-122.410369, 37.782043], size: 100 },
    ];

    const layer = new ScatterplotLayer({
      id: 'scatterplot-layer',
      data,
      getPosition: d => d.position,
      // getPosition: [-80.4925337, 43.4516395],
      getRadius: d => d.size,
      getColor: [255, 0, 0],
    });

    // new ScatterplotLayer({
    //   id: 'ScatterplotLayer',
    //   getFillColor: [255, 140, 0],
    //   getLineColor: [0, 0, 0],
    //   getRadius: d => 50,
    //   lineWidthMinPixels: 1,
    //   radiusMaxPixels: 100,
    //   radiusMinPixels: 1,
    //   radiusScale: 6,
    //   stroked: true,
    //   opacity: 0.8,
    // }),

    // console.log(1, map, map.map, mapRef);

    console.log(map.getRenderingType, map.getRenderingType?.());

    // overlay.setMap(map);
    overlay.setProps({
      layers: [layer],
    });
  }, [map, mapRef]);

  // console.log(deckOverlay.current);

  return (
    <div className="map">
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
        // ref={mapRef}
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

        {/* {deckOverlay.current && <div id="777dd" ref={deckOverlay.current.setContainer} />} */}

        {/* {mapRef.current && (
          <DeckGL
            getMapboxMap={() => mapRef.current}
            initialViewState={{ latitude: center.lat, longitude: center.lng, zoom: 10 }}
            controller={true}
            layers={[
              new ScatterplotLayer({
                id: 'ScatterplotLayer',
                getFillColor: [255, 140, 0],
                getLineColor: [0, 0, 0],
                getPosition: [-80.4925337, 43.4516395],
                getRadius: d => 50,
                lineWidthMinPixels: 1,
                radiusMaxPixels: 100,
                radiusMinPixels: 1,
                radiusScale: 6,
                stroked: true,
                opacity: 0.8,
              }),
            ]}
          />
        )} */}

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
            <Circle key={`30k`} center={office} radius={30000} options={middleOptions} />
            <Circle key={`45k`} center={office} radius={45000} options={farOptions} />
          </>
        )}
      </GoogleMap>
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

export default Map;
