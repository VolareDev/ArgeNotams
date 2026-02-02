
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import Sidebar from './components/Sidebar';
import AirportMarker from './components/AirportMarker';
import FIRMarker from './components/FIRMarker';
import { ARGENTINA_AIRPORTS, ARGENTINA_FIRS, MAP_CENTER, DEFAULT_ZOOM } from './constants';
import { Airport, FIR, Notam, GroundingSource, LocationType } from './types';
import { fetchNotams } from './services/geminiService';

const MapFlyTo: React.FC<{ coords: [number, number] | null }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 12, {
        animate: true,
        duration: 1.2
      });
    }
  }, [coords, map]);
  return null;
};

const App: React.FC = () => {
  const [selectedLoc, setSelectedLoc] = useState<{ type: LocationType, id: string } | null>(null);
  const [selectedName, setSelectedName] = useState("");
  const [flyToCoords, setFlyToCoords] = useState<[number, number] | null>(null);
  const [notams, setNotams] = useState<Notam[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [airports, setAirports] = useState<Airport[]>(ARGENTINA_AIRPORTS);
  const [search, setSearch] = useState('');

  const searchResults = useMemo(() => {
    if (!search) return [];
    const lower = search.toLowerCase();
    
    const matchedAirports = ARGENTINA_AIRPORTS.filter(a => 
      a.icao.toLowerCase().includes(lower) || 
      a.iata.toLowerCase().includes(lower) || 
      a.name.toLowerCase().includes(lower) ||
      a.city.toLowerCase().includes(lower)
    ).map(a => ({ type: 'AIRPORT' as LocationType, data: a }));

    const matchedFirs = ARGENTINA_FIRS.filter(f => 
      f.name.toLowerCase().includes(lower) || 
      f.icao.toLowerCase().includes(lower)
    ).map(f => ({ type: 'FIR' as LocationType, data: f }));

    const globalMatch = 'todos los fir argentina nacional global'.includes(lower) ? [{ type: 'GLOBAL' as LocationType, data: 'GLOBAL' as const }] : [];

    return [...globalMatch, ...matchedFirs, ...matchedAirports].slice(0, 6);
  }, [search]);

  const handleSelect = useCallback(async (type: LocationType, item: Airport | FIR | 'GLOBAL') => {
    setIsLoading(true);
    setNotams([]);
    setSources([]);
    setSearch(''); // Clear search on select

    if (type === 'GLOBAL') {
      setSelectedLoc({ type: 'GLOBAL', id: 'ALL' });
      setSelectedName("Avisos Nacionales");
      setFlyToCoords(null);
      const data = await fetchNotams("Argentina National", 'GLOBAL');
      setNotams(data.notams);
      setSources(data.sources);
    } else if (type === 'AIRPORT') {
      const airport = item as Airport;
      setSelectedLoc({ type: 'AIRPORT', id: airport.icao });
      setSelectedName(airport.name);
      setFlyToCoords([airport.lat, airport.lng]);
      const data = await fetchNotams(airport.icao, 'AIRPORT');
      setNotams(data.notams);
      setSources(data.sources);
      setAirports(prev => prev.map(a => a.icao === airport.icao ? { ...a, isClosed: data.isClosed } : a));
    } else {
      const fir = item as FIR;
      setSelectedLoc({ type: 'FIR', id: fir.icao });
      setSelectedName(fir.name);
      setFlyToCoords([fir.lat, fir.lng]);
      const data = await fetchNotams(fir.icao, 'FIR');
      setNotams(data.notams);
      setSources(data.sources);
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-slate-950 overflow-hidden">
      
      {/* Search Header - Mobile Floating or Desktop Sidebar Integration */}
      <div className="md:hidden absolute top-4 left-4 right-4 z-[2000] pointer-events-none">
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur border border-slate-700 rounded-xl shadow-2xl p-2">
          <input
            type="text"
            placeholder="Buscar Aeródromo o FIR..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className="mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
              {searchResults.map((result, i) => (
                <button
                  key={i}
                  className="w-full text-left px-4 py-3 hover:bg-slate-700 border-b border-slate-700 last:border-0 transition-colors"
                  onClick={() => handleSelect(result.type, result.data as any)}
                >
                  <span className="font-bold text-sm text-white">
                    {result.type === 'GLOBAL' ? 'Global Argentina' : (result.data as any).icao || (result.data as any).name}
                  </span>
                  <p className="text-[10px] text-slate-400">{(result.data as any).name || 'Avisos Nacionales'}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="order-2 md:order-1 flex-none md:h-full overflow-hidden">
        <Sidebar 
          selectedLocation={selectedLoc}
          selectedName={selectedName}
          onSelect={handleSelect}
          notams={notams}
          sources={sources}
          isLoading={isLoading}
        />
      </div>
      
      <div className="order-1 md:order-2 flex-1 relative h-[50vh] md:h-full border-b md:border-b-0 border-slate-800">
        <MapContainer 
          center={MAP_CENTER} 
          zoom={DEFAULT_ZOOM} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; CARTO'
          />
          
          {ARGENTINA_FIRS.map(fir => (
            <FIRMarker 
              key={fir.icao}
              fir={fir}
              isSelected={selectedLoc?.type === 'FIR' && selectedLoc.id === fir.icao}
              onClick={(f) => handleSelect('FIR', f)}
            />
          ))}

          {airports.map((airport) => (
            <AirportMarker 
              key={airport.icao} 
              airport={airport} 
              isSelected={selectedLoc?.type === 'AIRPORT' && selectedLoc.id === airport.icao}
              onClick={(a) => handleSelect('AIRPORT', a)}
            />
          ))}

          <MapFlyTo coords={flyToCoords} />
        </MapContainer>

        {/* Global Action Button (Floating Desktop) */}
        <button 
          onClick={() => handleSelect('GLOBAL', 'GLOBAL')}
          className="absolute bottom-6 right-6 z-[1000] hidden md:flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl transition-all font-bold border border-blue-400/30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>
          Avisos Nacionales
        </button>
      </div>
    </div>
  );
};

export default App;
