
export type LocationType = 'AIRPORT' | 'FIR' | 'GLOBAL';

export interface Airport {
  icao: string;
  iata: string;
  name: string;
  city: string;
  province: string;
  lat: number;
  lng: number;
  isClosed?: boolean;
}

export interface FIR {
  id: string;
  name: string;
  icao: string;
  lat: number;
  lng: number;
}

export enum NotamType {
  AGA = 'AGA',
  ANS = 'ANS',
  COM = 'COM',
  MET = 'MET',
  ATM = 'ATM',
  OTHER = 'OTHER'
}

export interface Notam {
  id: string;
  type: NotamType;
  rawText: string;
  summary: string;
  validity: {
    from: string;
    to: string;
  };
  level: 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface FetchResult {
  notams: Notam[];
  sources: GroundingSource[];
  isClosed?: boolean;
}
