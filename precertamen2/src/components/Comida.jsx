import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebasicComponents';
import Tabla from './Tabla';

const Comida = () => {
  const [listaComida, setListaComida] = useState([]);

  useEffect(() => {
    const obtenerComida = async () => {
      const ref = collection(db, 'comida');
      const snap = await getDocs(ref);
      
      // Procesamos los datos para que "congelado" se vea bonito (Sí/No)
      const datos = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convertimos booleano a texto para la tabla
        estadoTexto: doc.data().congelado ? '❄️ Congelado' : '🍎 Fresco'
      }));

      // REGLA: Congelados Primero [cite: 20]
      // true (congelado) va antes que false
      datos.sort((a, b) => Number(b.congelado) - Number(a.congelado));

      setListaComida(datos);
    };

    obtenerComida();
  }, []);

  const columnas = [
    { header: 'Alimento', key: 'nombre' },
    { header: 'Estado', key: 'estadoTexto' } // Usamos la key procesada
  ];

  return (
    <Tabla 
      titulo="Menú Navideño 🍗" 
      datos={listaComida} 
      columnas={columnas}
      idTabla="tabla-comida" 
    />
  );
};

export default Comida;