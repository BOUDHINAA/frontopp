import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Correction pour l'icône par défaut de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function JobOfferMap({ jobOffers = [], selectedPosition }) {
  const mapRef = useRef(null); // Référence pour la carte
  const tunisLocation = [36.8065, 10.1815]; // Centre par défaut
  const defaultZoom = 13;

  useEffect(() => {
    if (selectedPosition && mapRef.current) {
      // Si selectedPosition est défini, utilisez flyTo pour recentrer la carte
      mapRef.current.flyTo(selectedPosition, defaultZoom, {
        animate: true,
        duration: 1.5, // Durée de l'animation en secondes
      });
    }
  }, [selectedPosition]); // Appellez cet effet lorsque selectedPosition change

  return (
    <MapContainer
      center={selectedPosition || tunisLocation}
      zoom={defaultZoom}
      style={{ height: '500px', width: '100%' }}
      ref={mapRef} // Ajoutez la référence
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {jobOffers.map((offer) => (
        <Marker
          key={offer._id}
          position={[offer.latitude, offer.longitude]}
        >
          <Popup>
            <h3>{offer.title}</h3>
            <p>{offer.location}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default JobOfferMap;
