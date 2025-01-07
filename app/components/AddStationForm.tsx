import { FormEvent } from "react";

import { ChangeEvent, useState } from "react";
import { Station } from "../typings";

interface AddStationFormProps {
    stations: Station[];
    setStations: (stations: Station[]) => void;
    onAddStationSuccess: () => void;
}

const initialStation: Station = {
    id: '',
    localidad: '',
    direccion: '',
    marca: '',
    telefono: '',
    horario: '',
    latitud: '40.4168',
    longitud: '-3.7038',
    fecha: new Date().toISOString().split('T')[0],
};
  
const AddStationForm = ({ stations, setStations, onAddStationSuccess }: AddStationFormProps) => {
    const [newStation, setNewStation] = useState<Station>(initialStation);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewStation(prevState => ({ ...prevState, [name]: value }));
      };
    
      const getLastIdAsNumber: number = parseInt(stations[stations.length - 1]?.id || '0') || 0;
    
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
        onAddStationSuccess();
      };    

  return (
    <form onSubmit={handleAddStation} className="mb-5 space-y-4">
        <input
          type="text"
          name="localidad"
          placeholder="Localidad"
          value={newStation.localidad}
          onChange={handleInputChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="direccion"
          placeholder="Direccion"
          value={newStation.direccion}
          onChange={handleInputChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={newStation.marca}
          onChange={handleInputChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="telefono"
          placeholder="Telefono"
          value={newStation.telefono}
          onChange={handleInputChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="horario"
          placeholder="Horario"
          value={newStation.horario}
          onChange={handleInputChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="latitud"
          placeholder="Latitud"
          value={newStation.latitud}
          onChange={handleInputChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="longitud"
          placeholder="Longitud"
          value={newStation.longitud}
          onChange={handleInputChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="fecha"
          placeholder="Fecha"
          value={newStation.fecha}
          onChange={handleInputChange}
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Station</button>
      </form>  
    );
};

export default AddStationForm;