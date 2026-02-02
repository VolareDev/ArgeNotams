
import { Airport, FIR } from './types';

export const ARGENTINA_AIRPORTS: Airport[] = [
  // INTERNACIONALES Y TRÁFICO PESADO
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
  
  // ÁREA METROPOLITANA Y CONTROLADOS PBA (ATS)
  { icao: 'SADF', iata: 'FDO', name: 'Aeropuerto San Fernando', city: 'San Fernando', province: 'Buenos Aires', lat: -34.4533, lng: -58.5900 },
  { icao: 'SADP', iata: 'EPA', name: 'El Palomar', city: 'El Palomar', province: 'Buenos Aires', lat: -34.6100, lng: -58.6010 },
  { icao: 'SADM', iata: 'MOR', name: 'Aeródromo Morón', city: 'Morón', province: 'Buenos Aires', lat: -34.6761, lng: -58.6444 },
  { icao: 'SADL', iata: 'LPG', name: 'Aeropuerto de La Plata', city: 'La Plata', province: 'Buenos Aires', lat: -34.9722, lng: -57.8947 },
  { icao: 'SADR', iata: 'MLO', name: 'Aeródromo Moreno (Mariano Moreno)', city: 'Moreno', province: 'Buenos Aires', lat: -34.5539, lng: -58.7881 },
  { icao: 'SAYQ', iata: 'QUI', name: 'Aeródromo Quilmes', city: 'Quilmes', province: 'Buenos Aires', lat: -34.7869, lng: -58.2464 },
  { icao: 'SADZ', iata: 'MAT', name: 'Aeródromo San Justo', city: 'La Matanza', province: 'Buenos Aires', lat: -34.7175, lng: -58.5322 },
  
  // RESTO DEL PAÍS - CAPITALES Y ATS CONTROLADOS
  { icao: 'SANU', iata: 'UAQ', name: 'Domingo Faustino Sarmiento', city: 'San Juan', province: 'San Juan', lat: -31.5714, lng: -68.4183 },
  { icao: 'SANC', iata: 'CTC', name: 'Felipe Varela', city: 'Catamarca', province: 'Catamarca', lat: -28.5925, lng: -65.7511 },
  { icao: 'SANR', iata: 'IRJ', name: 'Vicente Almandos Almonacid', city: 'La Rioja', province: 'La Rioja', lat: -29.3806, lng: -66.7958 },
  { icao: 'SANL', iata: 'LUQ', name: 'Brigadier Mayor César R. Ojeda', city: 'San Luis', province: 'San Luis', lat: -33.2722, lng: -66.3547 },
  { icao: 'SAOR', iata: 'VME', name: 'Gobernador Castello', city: 'Viedma', province: 'Río Negro', lat: -40.8692, lng: -63.0033 },
  { icao: 'SAZY', iata: 'CPC', name: 'Aviador Carlos Campos', city: 'San Martín de los Andes', province: 'Neuquén', lat: -40.0752, lng: -71.1373 },
  { icao: 'SAAV', iata: 'SFN', name: 'Sauce Viejo', city: 'Santa Fe', province: 'Santa Fe', lat: -31.7117, lng: -60.8117 },
  { icao: 'SANT', iata: 'SDE', name: 'Vicecomodoro Ángel de la Paz Aragonés', city: 'Santiago del Estero', province: 'Santiago del Estero', lat: -27.7661, lng: -64.3106 },
  { icao: 'SAVV', iata: 'EQS', name: 'Aeropuerto de Esquel', city: 'Esquel', province: 'Chubut', lat: -42.9078, lng: -71.1394 },
  { icao: 'SAVT', iata: 'REL', name: 'Almirante Zar', city: 'Trelew', province: 'Chubut', lat: -43.2106, lng: -65.2703 },
  { icao: 'SAVY', iata: 'PMY', name: 'El Tehuelche', city: 'Puerto Madryn', province: 'Chubut', lat: -42.7592, lng: -65.1028 },
  { icao: 'SAWG', iata: 'RGL', name: 'Piloto Civil Norberto Fernández', city: 'Río Gallegos', province: 'Santa Cruz', lat: -51.6089, lng: -69.3128 },
  { icao: 'SAWE', iata: 'RGA', name: 'Gobernador Ramón Trejo Noel', city: 'Río Grande', province: 'Tierra del Fuego', lat: -53.7775, lng: -67.7494 },
  { icao: 'SAZT', iata: 'AFA', name: 'Aeropuerto San Rafael', city: 'San Rafael', province: 'Mendoza', lat: -34.5881, lng: -68.4031 },
  { icao: 'SATR', iata: 'RCQ', name: 'Aeropuerto Reconquista', city: 'Reconquista', province: 'Santa Fe', lat: -29.2103, lng: -59.6953 },
  { icao: 'SAOC', iata: 'RCU', name: 'Área de Material Río Cuarto', city: 'Río Cuarto', province: 'Córdoba', lat: -33.1256, lng: -64.2611 },
  { icao: 'SAOL', iata: 'PRL', name: 'Aeropuerto Paso de los Libres', city: 'Paso de los Libres', province: 'Corrientes', lat: -29.6892, lng: -57.1522 },
  { icao: 'SAOU', iata: 'RSA', name: 'Aeropuerto Santa Rosa', city: 'Santa Rosa', province: 'La Pampa', lat: -36.5886, lng: -64.2758 },
  { icao: 'SASY', iata: 'SUN', name: 'Aeródromo Sunchales', city: 'Sunchales', province: 'Santa Fe', lat: -30.9389, lng: -61.5033 },
  { icao: 'SAOD', iata: 'VDR', name: 'Aeródromo Villa Dolores', city: 'Villa Dolores', province: 'Córdoba', lat: -31.9458, lng: -65.1389 },
  { icao: 'SAWC', iata: 'FTE', name: 'Comandante Armando Tola', city: 'El Calafate', province: 'Santa Cruz', lat: -50.2803, lng: -72.0531 },
  { icao: 'SAWP', iata: 'PUD', name: 'Aeropuerto Puerto Deseado', city: 'Puerto Deseado', province: 'Santa Cruz', lat: -47.7358, lng: -65.9036 },
  { icao: 'SARR', iata: 'CLX', name: 'Aeropuerto de Clorinda', city: 'Clorinda', province: 'Formosa', lat: -25.2667, lng: -57.7333 },
  { icao: 'SARL', iata: 'LTS', name: 'Aeropuerto de Paso de los Libres', city: 'Paso de los Libres', province: 'Corrientes', lat: -29.6892, lng: -57.1522 }
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

