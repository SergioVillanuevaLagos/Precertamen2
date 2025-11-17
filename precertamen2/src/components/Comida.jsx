import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebasicComponents';
import Tabla from './Tabla';

const Comida = () => {
  const [listaComida, setListaComida] = useState([]);

  useEffect(() => {
    const obtenerComida = async () => {
      // CAMBIO: Colección con Mayúscula
      const ref = collection(db, 'Comida');
      const snap = await getDocs(ref);
      
      const datos = snap.docs.map(doc => {
        const data = doc.data();
        // Lógica para detectar si es congelado basado en texto ("si"/"no")
        const esCongelado = data.congelado === "si" || data.congelado === "true";

        return {
          id: doc.id,
          // CAMBIO: Asignamos el campo 'alimento' de la BD al campo 'nombre' que usa la tabla
          nombre: data.alimento, 
          // Guardamos el booleano para poder ordenar
          esCongelado: esCongelado,
          // Generamos el texto bonito
          estadoTexto: esCongelado ? 'Congelado' : 'Fresco'
        };
      });

      // Ordenamos usando el booleano que calculamos arriba
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