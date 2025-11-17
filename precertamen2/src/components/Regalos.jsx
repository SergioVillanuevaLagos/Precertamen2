import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebasicComponents';
import Tabla from './Tabla';

const Regalos = () => {
  const [listaRegalos, setListaRegalos] = useState([]);

  useEffect(() => {
    const obtenerRegalos = async () => {
      // CAMBIO: Colección con Mayúscula
      const ref = collection(db, 'Regalos'); 
      const snap = await getDocs(ref);
      
      const datos = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Orden ascendente (1 primero)
      datos.sort((a, b) => a.prioridad - b.prioridad);
      
      setListaRegalos(datos);
    };
    obtenerRegalos();
  }, []);

  const columnas = [
    { header: 'Regalo', key: 'nombre' },
    { header: 'Para quién', key: 'familiar' },
    { header: 'Prioridad', key: 'prioridad' }
  ];

  return (
    <Tabla 
      titulo="Lista de Regalos" 
      datos={listaRegalos} 
      columnas={columnas}
      idTabla="tabla-regalos" 
    />
  );
};

export default Regalos;