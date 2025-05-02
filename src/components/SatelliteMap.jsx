import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px'
};

const SatelliteMap = ({ position }) => {
  const [map, setMap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY 
  });

  useEffect(() => {
    if (map && position) {
      map.panTo(position);
    }
  }, [position, map]);

  if (!isLoaded) return (
    <div className="map-loading">
      <div className="spinner"></div>
      <p>Načítavam mapu...</p>
    </div>
  );

  return (
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
          }
        ]
      }}
    >
      <Marker 
        position={position} 
        title="Pozícia CanSatu"
        icon={{
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#ff0000",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2
        }}
      />
    </GoogleMap>
  );
};

export default React.memo(SatelliteMap);