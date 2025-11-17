import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebasicComponents';
import Tabla from './Tabla';

const Adornos = () => {
  const [listaAdornos, setListaAdornos] = useState([]);

  useEffect(() => {
    const obtenerAdornos = async () => {
      // CAMBIO: La colección en tu BD empieza con Mayúscula
      const ref = collection(db, 'Adornos');
      const snap = await getDocs(ref);
      
      const datos = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // CAMBIO: Usamos Number() porque en tu BD la cantidad está guardada como texto ("1")
      datos.sort((a, b) => Number(a.cantidad) - Number(b.cantidad));
      
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
      titulo="Inventario Adornos" 
      datos={listaAdornos} 
      columnas={columnas}
      idTabla="tabla-adornos" 
    />
  );
};

export default Adornos;