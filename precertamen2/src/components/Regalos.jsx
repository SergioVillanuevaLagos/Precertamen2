import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebasicComponents'; 
import Tabla from './Tabla';

const Regalos = () => {
  const [listaRegalos, setListaRegalos] = useState([]);

  useEffect(() => {
    const obtenerRegalos = async () => {
      const ref = collection(db, 'regalos'); // Colección "regalos" 
      const snap = await getDocs(ref);
      
      const datos = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // REGLA: Ordenar por Prioridad (1-3) [cite: 20]
      // Asumimos que 1 es más importante, orden ascendente.
      datos.sort((a, b) => a.prioridad - b.prioridad);

      setListaRegalos(datos);
    };

    obtenerRegalos();
  }, []);

  // Definimos qué columnas queremos mostrar en la Tabla
  const columnas = [
    { header: 'Regalo', key: 'nombre' },
    { header: 'Para quién', key: 'familiar' }, // [cite: 17]
    { header: 'Prioridad', key: 'prioridad' }
  ];

  return (
    <Tabla 
      titulo="Lista de Regalos 🎁" 
      datos={listaRegalos} 
      columnas={columnas}
      idTabla="tabla-regalos" 
    />
  );
};

export default Regalos;