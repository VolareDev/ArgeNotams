
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Airport } from '../types';

interface AirportMarkerProps {
  airport: Airport;
  isSelected: boolean;
  onClick: (airport: Airport) => void;
}

const AirportMarker: React.FC<AirportMarkerProps> = ({ airport, isSelected, onClick }) => {
  const isClosed = airport.isClosed;
  const baseColor = isClosed ? 'bg-orange-500' : (isSelected ? 'bg-blue-500' : 'bg-slate-700');
  const borderColor = isClosed ? 'border-orange-200' : (isSelected ? 'border-white' : 'border-slate-400');
  
  const airportIcon = L.divIcon({
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-8 h-8 rounded-full ${isSelected ? (isClosed ? 'bg-orange-500 animate-ping opacity-75' : 'bg-blue-500 animate-ping opacity-75') : 'bg-transparent'}"></div>
        <div class="relative flex items-center justify-center w-6 h-6 rounded-full ${baseColor} border ${isSelected ? 'border-2' : ''} ${borderColor} shadow-lg transform transition-transform duration-300 hover:scale-125">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
          </svg>
        </div>
      </div>
    `,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [18, 12] // Offset slightly left
  });

  return (
    <Marker 
      position={[airport.lat, airport.lng]} 
      icon={airportIcon}
      eventHandlers={{
        click: () => onClick(airport)
      }}
    >
      <Popup className="custom-popup">
        <div className="p-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h3 className={`font-bold text-sm ${isClosed ? 'text-orange-400' : ''}`}>{airport.icao} / {airport.iata}</h3>
            {isClosed && <span className="bg-orange-500 text-[8px] px-1 rounded font-bold text-white uppercase">Cerrado</span>}
          </div>
          <p className="text-xs text-slate-300">{airport.name}</p>
          <p className="text-[10px] text-blue-400 mt-1 uppercase">{airport.city}, {airport.province}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default AirportMarker;
