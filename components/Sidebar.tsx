
import React, { useState, useMemo } from 'react';
import { Airport, FIR, Notam, GroundingSource, NotamType, LocationType } from '../types';
import { ARGENTINA_AIRPORTS, ARGENTINA_FIRS } from '../constants';
import NotamCard from './NotamCard';

interface SidebarProps {
  selectedLocation: { type: LocationType, id: string } | null;
  selectedName: string;
  onSelect: (type: LocationType, item: Airport | FIR | 'GLOBAL') => void;
  notams: Notam[];
  sources: GroundingSource[];
  isLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  selectedLocation,
  selectedName,
  onSelect,
  notams, 
  sources, 
  isLoading 
}) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<NotamType | 'ALL'>('ALL');

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

  const filteredNotams = useMemo(() => {
    if (activeFilter === 'ALL') return notams;
    return notams.filter(n => n.type === activeFilter);
  }, [notams, activeFilter]);

  return (
    <div className="w-full md:w-96 bg-slate-900 border-r border-slate-800 flex flex-col h-full z-20 overflow-hidden text-slate-200">
      {/* Search Header - Hidden on mobile as it moves to floating search in App.tsx */}
      <div className="hidden md:block p-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">ArgenNOTAM</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Nacional Ops Monitor</p>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Aeródromo, FIR o 'Global'..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500 shadow-inner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-slate-800 mt-2 border border-slate-700 rounded-xl shadow-2xl z-[1001] overflow-hidden">
              {searchResults.map((result, i) => (
                <button
                  key={i}
                  className="w-full text-left px-4 py-3 hover:bg-slate-700 border-b border-slate-700 last:border-0 transition-colors"
                  onClick={() => {
                    onSelect(result.type, result.data as any);
                    setSearch('');
                  }}
                >
                  {result.type === 'AIRPORT' && (
                    <>
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-sm">{(result.data as Airport).icao}</span>
                        <span className="text-[9px] bg-blue-900/50 text-blue-300 px-1.5 rounded uppercase">AD</span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">{(result.data as Airport).name}</p>
                    </>
                  )}
                  {result.type === 'FIR' && (
                    <>
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-sm text-emerald-400">{(result.data as FIR).name}</span>
                        <span className="text-[9px] bg-emerald-900/50 text-emerald-300 px-1.5 rounded uppercase">FIR</span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">{(result.data as FIR).icao}</p>
                    </>
                  )}
                  {result.type === 'GLOBAL' && (
                    <div className="flex items-center gap-2 py-1">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                      <span className="font-bold text-sm text-blue-400 uppercase">Avisos Nacionales</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {!selectedLocation ? (
          <div className="p-10 text-center flex flex-col items-center justify-center h-full opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-slate-700 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></svg>
            <h2 className="text-sm font-medium text-slate-400">Selecciona una ubicación para ver resultados</h2>
          </div>
        ) : (
          <div className="p-4 md:p-6">
            <div className="mb-6">
              <div className="flex justify-between items-start mb-1">
                <h2 className={`text-xl md:text-2xl font-bold ${selectedLocation.type === 'FIR' ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {selectedName}
                </h2>
                <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded border border-slate-700 uppercase">
                  {selectedLocation.type}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight">Vigilancia en tiempo real • {new Date().toLocaleTimeString('es-AR')}</p>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
              {['ALL', ...Object.values(NotamType)].map(type => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type as any)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all whitespace-nowrap ${
                    activeFilter === type 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin mb-6 shadow-2xl shadow-blue-500/40"></div>
                <p className="text-xs text-slate-500 font-medium animate-pulse tracking-wide uppercase">Buscando NOTAMs...</p>
              </div>
            ) : filteredNotams.length > 0 ? (
              <div className="space-y-4">
                {filteredNotams.map(notam => (
                  <NotamCard key={notam.id} notam={notam} />
                ))}
              </div>
            ) : (
              <div className="p-10 text-center bg-slate-800/30 rounded-2xl border border-dashed border-slate-800">
                <p className="text-sm text-slate-500">No se encontraron avisos vigentes.</p>
              </div>
            )}

            {sources.length > 0 && !isLoading && (
              <div className="mt-8 pt-6 border-t border-slate-800">
                <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-4">Fuentes Verificadas</h3>
                <ul className="space-y-3">
                  {sources.map((src, idx) => (
                    <li key={idx}>
                      <a href={src.uri} target="_blank" rel="noreferrer" className="group text-[11px] text-blue-400/80 hover:text-blue-300 flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center group-hover:bg-blue-900/30">
                           <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </div>
                        <span className="truncate">{src.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hidden md:flex p-4 bg-slate-950 border-t border-slate-800 justify-between items-center text-[10px] text-slate-600 font-mono">
        <span>ARG-AIS-MONITOR v2.5</span>
        <div className="flex items-center gap-1.5 text-emerald-500/80">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          Online
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
