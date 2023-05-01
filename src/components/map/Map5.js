import { Map, GoogleApiWrapper } from 'google-maps-react';
import { useEffect, useRef, useState } from 'react';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { TripsLayer } from '@deck.gl/geo-layers';
import { ScatterplotLayer } from 'deck.gl';

const MapContainer = props => {
  const mapRef = useRef(null);
  const deckOverlay = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const map = mapRef.current;

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

    // const layer = new ScatterplotLayer({
    //   id: 'scatterplot-layer',
    //   data,
    //   getPosition: d => d.position,
    //   getRadius: d => d.size,
    //   getColor: [255, 0, 0],
    // });

    const layer = new ScatterplotLayer({
      id: 'scatterplot-layer',
      data,
      getPosition: d => d.position,
      // getPosition: [-80.4925337, 43.4516395],
      getRadius: d => d.size,
      getColor: [255, 0, 0],
    });

    // const layer = new TripsLayer({
    //   id: 'trips',
    //   data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json',
    //   getPath: d => d.path,
    //   getTimestamps: d => d.timestamps,
    //   getColor: d => {
    //     const vendorColors = [
    //       [255, 0, 0],
    //       [0, 0, 255],
    //     ];
    //     return vendorColors[d.vendor];
    //   },
    //   opacity: 1,
    //   widthMinPixels: 2,
    //   trailLength: 180,
    //   currentTime: 0,
    //   shadowEnabled: false,
    // });

    console.log(map);

    console.log(map);

    overlay.setMap(map.map);
    overlay.setProps({
      layers: [layer],
    });

    // const animate = () => {
    //   const currentTime = (layer.props.currentTime + 1) % 1800;
    //   layer.setProps?.({ currentTime });
    //   window.requestAnimationFrame(animate);
    // };
    // window.requestAnimationFrame(animate);
  }, [loaded]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ height: '100vh', width: '100%' }}>
        <Map
          defaultCenter={{ lat: 37.774929, lng: -122.419416 }}
          defaultZoom={11}
          google={props.google}
          ref={mapRef}
          onReady={() => setLoaded(true)}
        />
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBa1O7w8n-0Rf1PshL2MhvBuhtX6_m6peg',
})(MapContainer);
