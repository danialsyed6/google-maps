import { Map, GoogleApiWrapper } from 'google-maps-react';
import { useEffect, useRef, useState } from 'react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

const MapContainer = props => {
  const [, setViewport] = useState(null);

  const map = useRef();

  const handleMapLoaded = (mapProps, map) => {
    const bounds = map.getBounds();

    setViewport({
      latitude: bounds?.getCenter().lat(),
      longitude: bounds?.getCenter().lng(),
      zoom: 14,
    });

    // Change the base map styles
    map.setOptions({
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e9e9e9',
            },
            {
              lightness: 17,
            },
          ],
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5',
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#ffffff',
            },
            {
              lightness: 17,
            },
          ],
        },
        // Add more styles here
      ],
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

  useEffect(() => {
    // Remove the default "Powered by Google" logo
    const removeLogo = () => {
      const logos = document.querySelectorAll('img[src$="googlemap.png"]');
      logos.forEach(logo => {
        logo.style.display = 'none';
      });
    };

    removeLogo();
  }, []);

  return (
    <Map
      ref={map}
      google={props.google}
      style={mapStyles}
      zoom={14}
      onReady={handleMapLoaded}
      onIdle={handleMapMoved}
    ></Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBa1O7w8n-0Rf1PshL2MhvBuhtX6_m6peg',
})(MapContainer);
