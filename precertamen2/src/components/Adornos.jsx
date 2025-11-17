import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebasicComponents';
import Tabla from './Tabla';

const Adornos = () => {
  const [listaAdornos, setListaAdornos] = useState([]);

  useEffect(() => {
    const obtenerAdornos = async () => {
      const ref = collection(db, 'adornos');
      const snap = await getDocs(ref);
      
      const datos = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // REGLA: Cantidad Menor Primero (Ascendente) [cite: 20]
      datos.sort((a, b) => a.cantidad - b.cantidad);

      setListaAdornos(datos);
    };

    obtenerAdornos();
  }, []);

  const columnas = [
    { header: 'Adorno', key: 'nombre' },
    { header: 'Cantidad', key: 'cantidad' }
  ];

  return (
    <Tabla 
      titulo="Inventario Adornos 🎄" 
      datos={listaAdornos} 
      columnas={columnas}
      idTabla="tabla-adornos" 
    />
  );
};

export default Adornos;