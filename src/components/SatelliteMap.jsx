import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '500px'
};

const SatelliteMap = ({ position, isDemoMode }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && position) {
      map.panTo(position);
    }
  }, [position, map]);

  if (!isLoaded) return (
    <div className="map-loading">
      <div className="spinner"></div>
      <p>Loading map...</p>
    </div>
  );

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={15}
        onLoad={map => setMap(map)}
        options={{
          streetViewControl: false,
          mapTypeControl: true,
          mapTypeId: 'hybrid',
          styles: [
            {
              featureType: "poi",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "transit",
              stylers: [{ visibility: "off" }]
            }
          ]
        }}
      >
        <Marker 
          position={position}
          title={`Position: ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}${isDemoMode ? ' (DEMO)' : ''}`}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: isDemoMode ? "#555" : "#ff0000",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default React.memo(SatelliteMap);