
import { Airport, FIR } from './types';

export const ARGENTINA_AIRPORTS: Airport[] = [
  { icao: 'SAEZ', iata: 'EZE', name: 'Ezeiza / Ministro Pistarini', city: 'Ezeiza', province: 'Buenos Aires', lat: -34.8222, lng: -58.5358 },
  { icao: 'SABE', iata: 'AEP', name: 'Aeroparque Jorge Newbery', city: 'Buenos Aires', province: 'CABA', lat: -34.5592, lng: -58.4156 },
  { icao: 'SACO', iata: 'COR', name: 'Ing. Ambrosio Taravella', city: 'Córdoba', province: 'Córdoba', lat: -31.3236, lng: -64.2081 },
  { icao: 'SAME', iata: 'MDZ', name: 'El Plumerillo', city: 'Mendoza', province: 'Mendoza', lat: -32.8317, lng: -68.7928 },
  { icao: 'SAAR', iata: 'ROS', name: 'Rosario Islas Malvinas', city: 'Rosario', province: 'Santa Fe', lat: -32.9036, lng: -60.7847 },
  { icao: 'SAWH', iata: 'USH', name: 'Ushuaia Malvinas Argentinas', city: 'Ushuaia', province: 'Tierra del Fuego', lat: -54.8433, lng: -68.2958 },
  { icao: 'SAZS', iata: 'BRC', name: 'Teniente Luis Candelaria', city: 'Bariloche', province: 'Río Negro', lat: -41.1512, lng: -71.1394 },
  { icao: 'SASA', iata: 'SLA', name: 'Martín Miguel de Güemes', city: 'Salta', province: 'Salta', lat: -24.8561, lng: -65.4856 },
  { icao: 'SARI', iata: 'IGR', name: 'Cataratas del Iguazú', city: 'Puerto Iguazú', province: 'Misiones', lat: -25.7373, lng: -54.4734 },
  { icao: 'SAVC', iata: 'CRD', name: 'General Enrique Mosconi', city: 'Comodoro Rivadavia', province: 'Chubut', lat: -45.7853, lng: -67.4655 },
  { icao: 'SAZN', iata: 'NQN', name: 'Presidente Perón', city: 'Neuquén', province: 'Neuquén', lat: -38.9489, lng: -68.1558 },
  { icao: 'SAZM', iata: 'MDQ', name: 'Astor Piazzolla', city: 'Mar del Plata', province: 'Buenos Aires', lat: -37.9342, lng: -57.5733 },
  { icao: 'SATU', iata: 'TUC', name: 'Teniente Benjamín Matienzo', city: 'Tucumán', province: 'Tucumán', lat: -26.8409, lng: -65.1048 },
  { icao: 'SARE', iata: 'RES', name: 'Aeropuerto de Resistencia', city: 'Resistencia', province: 'Chaco', lat: -27.4455, lng: -59.0560 },
  { icao: 'SARP', iata: 'PSS', name: 'Libertador Gral. San Martín', city: 'Posadas', province: 'Misiones', lat: -27.3858, lng: -55.9708 },
  { icao: 'SADF', iata: 'FDO', name: 'Aeropuerto San Fernando', city: 'San Fernando', province: 'Buenos Aires', lat: -34.4533, lng: -58.5900 },
  { icao: 'SADP', iata: 'EPA', name: 'El Palomar', city: 'El Palomar', province: 'Buenos Aires', lat: -34.6100, lng: -58.6010 },
  { icao: 'SAOR', iata: 'GRA', name: 'Gobernador Castello', city: 'Viedma', province: 'Río Negro', lat: -40.8692, lng: -63.0033 },
  { icao: 'SAZY', iata: 'CPC', name: 'Aviador Carlos Campos', city: 'San Martín de los Andes', province: 'Neuquén', lat: -40.0752, lng: -71.1373 },
  { icao: 'SAAV', iata: 'SFN', name: 'Sauce Viejo', city: 'Santa Fe', province: 'Santa Fe', lat: -31.7117, lng: -60.8117 },
  { icao: 'SANT', iata: 'SDE', name: 'Vicecomodoro Ángel de la Paz Aragonés', city: 'Santiago del Estero', province: 'Santiago del Estero', lat: -27.7661, lng: -64.3106 }
];

export const ARGENTINA_FIRS: FIR[] = [
  { id: 'EZE', name: 'FIR Ezeiza', icao: 'SAEF', lat: -34.81339630009642, lng: -58.54126339820513 },
  { id: 'RES', name: 'FIR Resistencia', icao: 'SARF', lat: -27.448208603531178, lng: -59.050188509858835 },
  { id: 'MDZ', name: 'FIR Mendoza', icao: 'SAMF', lat: -32.82855751983284, lng: -68.79831244440959 },
  { id: 'COR', name: 'FIR Córdoba', icao: 'SACF', lat: -31.311861805302264, lng: -64.21456493947417 },
  { id: 'CRD', name: 'FIR Comodoro Rivadavia', icao: 'SAVF', lat: -45.7899073453403, lng: -67.46948640409757 }
];

export const MAP_CENTER: [number, number] = [-38.4161, -63.6167];
export const DEFAULT_ZOOM = 4;
