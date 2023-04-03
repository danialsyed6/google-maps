// import { ScatterplotLayer } from 'deck.gl/layers';
// import DeckGL from 'deck.gl/react';
import { DeckGL, ScatterplotLayer } from 'deck.gl';
// import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { useRef, useState } from 'react';

const MapContainer = props => {
  const [viewport, setViewport] = useState(null);

  const map = useRef();

  const handleMapLoaded = (mapProps, map) => {
    const bounds = map.getBounds();

    setViewport({
      latitude: bounds?.getCenter().lat(),
      longitude: bounds?.getCenter().lng(),
      zoom: 14,
    });
  };

  const data = [
    { position: [-122.419416, 37.774929], size: 100 },
    { position: [-122.416557, 37.778443], size: 100 },
    { position: [-122.410369, 37.782043], size: 100 },
  ];

  const layer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data,
    getPosition: d => d.position,
    getRadius: d => d.size,
    getColor: [255, 0, 0],
  });

  const handleMapMoved = (mapProps, map) => {
    const bounds = map.getBounds();
    const zoom = map.getZoom();

    console.log({
      latitude: bounds?.getCenter().lat(),
      longitude: bounds?.getCenter().lng(),
      zoom,
    });

    setViewport({
      latitude: bounds?.getCenter().lat(),
      longitude: bounds?.getCenter().lng(),
      zoom,
    });
    // const { center, zoom } = mapProps;

    // setViewport({
    //   latitude: center.lat(),
    //   longitude: center.lng(),
    //   zoom,
    // });
  };

  return (
    <Map
      ref={map}
      google={props.google}
      zoom={14}
      onReady={handleMapLoaded}
      onIdle={handleMapMoved}
    >
      {map && viewport && (
        <DeckGL
          viewState={viewport}
          layers={[layer]}
          // controller
          // getTooltip={({ object }) =>
          //   object && `${object.position[1]}, ${object.position[0]}`
          // }
          // onViewportChange={viewport => setViewport(viewport)}
        />
      )}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBa1O7w8n-0Rf1PshL2MhvBuhtX6_m6peg',
})(MapContainer);
