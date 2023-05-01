import { Map, GoogleApiWrapper } from 'google-maps-react';
import { useEffect, useRef, useState } from 'react';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { TripsLayer } from '@deck.gl/geo-layers';

const LOOP_LENGTH = 1800;
const VENDOR_COLORS = [
  [255, 0, 0],
  [0, 0, 255], // vendor #1
];

const MapContainer = props => {
  const deckOverlay = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const [viewport, setViewport] = useState(null);

  console.log(viewport);

  const map = useRef();

  useEffect(() => {
    if (map.current) {
      deckOverlay.current = new GoogleMapsOverlay({
        layers: [
          new TripsLayer({
            id: 'trips',
            data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json',
            getPath: d => d.path,
            getTimestamps: d => d.timestamps,
            getColor: d => VENDOR_COLORS[d.vendor],
            opacity: 1,
            widthMinPixels: 2,
            trailLength: 180,
            currentTime,
            shadowEnabled: false,
          }),
        ],
        map,
      });
      const animate = () => {
        setCurrentTime((currentTime + 1) % LOOP_LENGTH);
        window.requestAnimationFrame(animate);
      };
      window.requestAnimationFrame(animate);
    }
  }, [currentTime, viewport]);

  const handleMapLoaded = (mapProps, map) => {
    const bounds = map.getBounds();

    setViewport({
      latitude: bounds?.getCenter().lat(),
      longitude: bounds?.getCenter().lng(),
      zoom: 14,
    });
  };

  const handleMapMoved = (mapProps, map) => {
    const bounds = map.getBounds();
    const zoom = map.getZoom();

    setViewport({
      latitude: bounds?.getCenter().lat(),
      longitude: bounds?.getCenter().lng(),
      zoom,
    });
  };

  console.log(deckOverlay?.current?.setContainer);

  return (
    <Map
      ref={map}
      google={props.google}
      zoom={14}
      onReady={handleMapLoaded}
      onIdle={handleMapMoved}
    >
      {/* {map && viewport && <div></div>} */}
      {deckOverlay.current && <div ref={deckOverlay.current.setContainer} />}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBa1O7w8n-0Rf1PshL2MhvBuhtX6_m6peg',
})(MapContainer);
