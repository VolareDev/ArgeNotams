
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { FIR } from '../types';

interface FIRMarkerProps {
  fir: FIR;
  isSelected: boolean;
  onClick: (fir: FIR) => void;
}

const FIRMarker: React.FC<FIRMarkerProps> = ({ fir, isSelected, onClick }) => {
  const firIcon = L.divIcon({
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-8 h-8 rounded-full ${isSelected ? 'bg-emerald-500 animate-ping opacity-75' : 'bg-transparent'}"></div>
        <div class="relative flex items-center justify-center w-6 h-6 rounded-full ${isSelected ? 'bg-emerald-500 border-2 border-white' : 'bg-slate-800 border border-emerald-500/50'} shadow-lg transform transition-transform duration-300 hover:scale-125">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-emerald-400 ${isSelected ? 'text-white' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h.01"/><path d="M7 16h10"/><path d="M10 12h4"/><path d="M12 4v4"/><path d="M8 8h8"/>
            <path d="M12 20v-4"/><path d="M12 12V8"/>
          </svg>
        </div>
      </div>
    `,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [6, 12] // Offset slightly right
  });

  return (
    <Marker 
      position={[fir.lat, fir.lng]} 
      icon={firIcon}
      eventHandlers={{
        click: () => onClick(fir)
      }}
    >
      <Popup className="custom-popup">
        <div className="p-1">
          <h3 className="font-bold text-xs text-emerald-400">CENTRO CONTROL: {fir.id}</h3>
          <p className="text-[10px] text-slate-300">{fir.name} / {fir.icao}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default FIRMarker;
