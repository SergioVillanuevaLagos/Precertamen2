import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebasicComponents';
import Tabla from './Tabla';

const Comida = () => {
  const [listaComida, setListaComida] = useState([]);

  useEffect(() => {
    const obtenerComida = async () => {
      const ref = collection(db, 'Comida');
      const snap = await getDocs(ref);
      
      const datos = snap.docs.map(doc => {
        const data = doc.data();
        const esCongelado = data.congelado === "si" || data.congelado === "true";

        return {
          id: doc.id,
          nombre: data.alimento,
          esCongelado: esCongelado,
          estadoTexto: esCongelado ? 'Congelado' : 'Fresco'
        };
      });

      datos.sort((a, b) => Number(b.esCongelado) - Number(a.esCongelado));
      
      setListaComida(datos);
    };
    obtenerComida();
  }, []);

  const columnas = [
    { header: 'Alimento', key: 'nombre' },
    { header: 'Estado', key: 'estadoTexto' }
  ];

  return (
    <Tabla 
      titulo="Menú Navideño" 
      datos={listaComida} 
      columnas={columnas}
      idTabla="tabla-comida" 
    />
  );
};

export default Comida;