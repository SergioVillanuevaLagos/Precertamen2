import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';

const Tabla = ({ titulo, datos, columnas, idTabla }) => {

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text(titulo, 20, 10);

    const head = [columnas.map(col => col.header)];
    const body = datos.map(item => columnas.map(col => item[col.key]));

    autoTable(doc, {
      head: head,
      body: body,
      startY: 20,
    });

    doc.save(`${titulo}.pdf`);
  };

  const generarExcel = () => {
    const datosExcel = datos.map(item => {
      const fila = {};
      columnas.forEach(col => {
        fila[col.header] = item[col.key];
      });
      return fila;
    });

    const hoja = XLSX.utils.json_to_sheet(datosExcel);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Hoja1");
    XLSX.writeFile(libro, `${titulo}.xlsx`);
  };

  const generarPNG = async () => {
    const elemento = document.getElementById(idTabla);
    if (elemento) {
      const canvas = await html2canvas(elemento);
      const imgData = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${titulo}.png`;
      link.click();
    }
  };

  return (
    <div className="contenedor-tabla" style={styles.card}>
      <div style={styles.header}>
        <h3 style={{ margin: 0 }}>{titulo}</h3>
        
        <div style={styles.botones}>
          <button onClick={generarPDF} style={styles.btn}> PDF</button>
          <button onClick={generarExcel} style={styles.btn}> Excel</button>
          <button onClick={generarPNG} style={styles.btn}> PNG</button>
        </div>
      </div>

      <div id={idTabla} style={{ padding: '10px', background: 'white' }}>
        <table style={styles.tabla}>
          <thead>
            <tr style={{ background: '#f4f4f4' }}>
              {columnas.map((col, index) => (
                <th key={index} style={styles.celdaHeader}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                {columnas.map((col, j) => (
                  <td key={j} style={styles.celdaBody}>
                    {fila[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  botones: {
    display: 'flex',
    gap: '5px'
  },
  btn: {
    padding: '5px 10px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.9rem'
  },
  tabla: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem'
  },
  celdaHeader: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd'
  },
  celdaBody: {
    padding: '10px',
    textAlign: 'left'
  }
};

export default Tabla;