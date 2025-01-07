'use client'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Papa from 'papaparse';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Station {
  id: string;
  localidad: string;
  direccion: string;
  marca: string;
  telefono: string;
  horario: string;
  latitud: string;
  longitud: string;
  fecha: string;
}

const initialStation: Station = {
  id: '',
  localidad: '',
  direccion: '',
  marca: '',
  telefono: '',
  horario: '',
  latitud: '',
  longitud: '',
  fecha: '',
};

const Page: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [mapCenter, setMapCenter] = useState({ lat: 40.4168, lng: -3.7038 });
  const [newStation, setNewStation] = useState<Station>(initialStation);

  useEffect(() => {
    fetch('/Gas Stations.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            setStations(result.data as Station[]);
          }
        });
      });
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStation(prevState => ({ ...prevState, [name]: value }));
  };

  const getLastIdAsNumber: number = parseInt(stations[stations.length - 1].id) || 0;

  const handleAddStation = (e: FormEvent) => {
    e.preventDefault();
    const updatedStations = [...stations, {
      id: (getLastIdAsNumber + 1).toString(),
      localidad: newStation.localidad,
      direccion: newStation.direccion,
      marca: newStation.marca,
      telefono: newStation.telefono,
      horario: newStation.horario,
      latitud: newStation.latitud,
      longitud: newStation.longitud,
      fecha: newStation.fecha
    }];
    setStations(updatedStations);
    localStorage.setItem('stations', JSON.stringify(updatedStations));
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Fuel Station Map</h1>
      <form onSubmit={handleAddStation} className="mb-5 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Station Name"
          value={newStation.name}
          onChange={handleInputChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={newStation.latitude}
          onChange={handleInputChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={newStation.longitude}
          onChange={handleInputChange}
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Station</button>
      </form>

      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          center={mapCenter}
          zoom={10}
          mapContainerStyle={{ height: '400px', width: '100%' }}
        >
          {stations.map((station, index) => (
            <Marker
              key={index}
              position={{ lat: parseFloat(station.latitude), lng: parseFloat(station.longitude) }}
              title={station.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Page;
