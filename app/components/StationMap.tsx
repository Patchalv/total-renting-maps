'use client'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { Station } from '../typings';
import AddStationForm from './AddStationForm';

const mapCenter = { lat: 40.4168, lng: -3.7038 };

const StationMap = () => {
    const [stations, setStations] = useState<Station[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
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
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    return (
        <div className="p-5">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-bold">Fuel Station Map</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(true)}>Add Station</button>
          </div>
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap
              center={mapCenter}
              zoom={6}
              mapContainerStyle={{ height: '800px', width: '100%' }}
            >
              {stations.map((station, index) => (
                <Marker
                  key={index}
                  position={{ lat: parseFloat(station.latitud), lng: parseFloat(station.longitud) }}
                  title={station.marca}
                />
              ))}
            </GoogleMap>
          </LoadScript>
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center" onClick={handleCloseModal}>
              <div className="bg-white p-5 rounded shadow-lg w-1/3 relative" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Add New Station</h2>
                  <button onClick={handleCloseModal} className="text-2xl text-gray-500 hover:text-gray-700">
                    &times;
                  </button>
                </div>
                <AddStationForm stations={stations} setStations={setStations} />
              </div>
            </div>
          )}
        </div>
      );
    };

export default StationMap;