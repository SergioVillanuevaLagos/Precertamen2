import React from 'react';
import Regalos from './Regalos';
import Comida from './Comida';
import Adornos from './Adornos';

const Tablas = () => {
  return (
    <div style={styles.contenedorPrincipal}>
      <header style={styles.header}>
        <h1 style={styles.titulo}> Pre Certamen 2 </h1>
      </header>

      <section style={styles.seccion}>
        <Regalos />
      </section>

      <hr style={styles.separador} />

      <section style={styles.seccion}>
        <Comida />
      </section>

      <hr style={styles.separador} />

      <section style={styles.seccion}>
        <Adornos />
      </section>

    </div>
  );
};

const styles = {
  contenedorPrincipal: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    backgroundColor: '#d32f2f',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  titulo: {
    margin: '0',
    fontSize: '2.5rem',
  },
  subtitulo: {
    margin: '10px 0 0 0',
    fontSize: '1.1rem',
    opacity: 0.9,
  },
  seccion: {
    marginBottom: '20px',
  },
  separador: {
    border: 'none',
    borderTop: '3px dashed #ccc',
    margin: '40px 0',
  },
  footer: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '0.8rem',
    color: '#666',
    borderTop: '1px solid #ddd',
    paddingTop: '20px',
  }
};

export default Tablas;