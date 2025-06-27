import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";

export function imprimirTratamientoPDF(t,mascota) {
  const doc = new jsPDF();
  const historial = mascota.historiales.find(h => h.tratamientos.some(tr => tr.id === t.id));
  const usuario = historial?.user?.name || 'Usuario desconocido';
  const fechaTratamiento = moment(t.fecha).format('DD/MM/YYYY HH:mm');
  const fechaHistorial = moment(historial?.fecha).format('DD/MM/YYYY');
  const nombreMascota = mascota.nombre || 'Mascota';

  doc.setFontSize(16);
  doc.text(`Clínica Veterinaria - Tratamiento (${t.id})`, 14, 15);

  doc.setFontSize(10);
  doc.text(`Fecha del tratamiento: ${fechaTratamiento}`, 14, 25);
  doc.text(`Fecha del historial: ${fechaHistorial}`, 14, 30);
  doc.text(`Usuario: ${usuario}`, 14, 35);
  doc.text(`Mascota: ${nombreMascota}`, 14, 40);
  doc.text(`Observaciones: ${t.observaciones || '-'}`, 14, 45);
  doc.text(`Comentario: ${t.comentario || '-'}`, 14, 50);

  // Tabla de medicamentos
  autoTable(doc, {
    startY: 58,
    head: [['Medicamento', 'Cantidad', 'Precio (Bs)', 'Total (Bs)']],
    body: t.tratamientoMedicamentos.map(med => [
      med.medicamento,
      med.cantidad,
      med.precio,
      med.total
    ]),
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    theme: 'grid'
  });

  const total = t.tratamientoMedicamentos.reduce((acc, m) => acc + parseFloat(m.total), 0).toFixed(2);

  doc.setFontSize(12);
  doc.text(`Total: ${total} Bs`, 14, doc.lastAutoTable.finalY + 10);

  doc.save(`Tratamiento-${t.id}.pdf`);
}

export function imprimirHistorialPDF(hist,mascota) {
  const doc = new jsPDF();
  // const mascota = this.mascota;
  // console.log(mascota)
  const tratamientos = hist.tratamientos || [];

  const bold = (text, x, y) => {
    doc.setFont(undefined, 'bold');
    doc.text(text, x, y);
    doc.setFont(undefined, 'normal');
  };

  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('HISTORIAL CLÍNICO', 85, 15);
  doc.setFontSize(10);

  // Datos generales
  bold('Nombre:', 15, 25);
  doc.text(mascota.nombre, 45, 25);
  bold('Propietario:', 105, 25);
  doc.text(mascota.propietario_nombre || '-', 140, 25);

  bold('Dirección:', 15, 30);
  doc.setFontSize(8); // más pequeña
  const direccion = doc.splitTextToSize(mascota.propietario_direccion || '-', 65);
  doc.text(direccion, 45, 28);
  doc.setFontSize(10); // vuelve al tamaño normal para lo siguiente
  bold('Celular:', 105, 30);
  doc.text(mascota?.propietario_telefono || '-', 140, 30);

  // Datos del paciente
  bold('Especie:', 15, 35);
  doc.text(mascota?.especie, 45, 35);
  bold('Raza:', 105, 35);
  doc.text(mascota?.raza || '-', 140, 35);

  bold('Edad:', 15, 40);
  doc.text(mascota?.edad, 45, 40);
  bold('Sexo:', 105, 40);
  doc.text(mascota?.sexo, 140, 40);

  bold('Peso:', 15, 45);
  doc.text(`${hist.peso || '-'} kg`, 45, 45);
  bold('Color:', 105, 45);
  doc.text(mascota?.color || '-', 140, 45);

  bold('Anamnesis:', 15, 50);
  doc.text(hist.anamnesis || '-', 45, 50);

  // Constantes fisiológicas
  let lineY = 55;
  const addField = (label, value, x) => {
    bold(`${label}:`, x, lineY);
    doc.text(value?.toString() || '-', x + 30, lineY, { maxWidth: 50 });
  };
  addField('TR', hist.tr, 15);
  addField('FC', hist.fc, 50);
  addField('FR', hist.fr, 85);
  addField('Pulso', hist.pulso, 120);

  lineY += 5;
  addField('TLLC', hist.tllc, 15);
  addField('THC', hist.thc, 50);

  // Vacunas
  lineY += 5;
  bold('VACUNAS:', 15, lineY);
  doc.text(
    `Parvo: ${hist.parvo === '1' ? 'Sí' : 'No'}   Hexa: ${hist.hexa === '1' ? 'Sí' : 'No'}   Octa: ${hist.octa === '1' ? 'Sí' : 'No'}   Rabica: ${hist.rabica === '1' ? 'Sí' : 'No'}   Triple: ${hist.triple === '1' ? 'Sí' : 'No'}`,
    45,
    lineY
  );

  lineY += 5;
  addField('CF', hist.cf, 15);
  addField('Mucosa', hist.moucosidada, 50);
  addField('Esterilizado', hist.esterelizado, 100);

  lineY += 5;
  addField('Desparasitación', hist.desparacitacion, 15);
  addField('Rayos X', hist.rayox, 75);
  addField('Laboratorio', hist.laboratoti, 145);

  lineY += 5;
  addField('Ecografía', hist.ecografia, 15);
  addField('Diagnóstico', hist.diagnostico, 75);
  addField('Pronóstico', hist.pronostico, 145);

  // Tratamientos
  lineY += 10;
  bold('Tratamientos Realizados', 15, lineY);

  autoTable(doc, {
    startY: lineY + 2,
    head: [['Fecha', 'Observaciones', 'Comentario', 'Medicamentos', 'Costo']],
    body: tratamientos.map(t => [
      moment(t.fecha).format('DD/MM/YYYY'),
      t.observaciones || '-',
      t.comentario || '-',
      t.tratamientoMedicamentos.map(m => m.medicamento).join(', ') || '-',
      `${t.costo.toFixed(2)} Bs`
    ]),
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [0, 102, 204], halign: 'center' },
    columnStyles: {
      0: { cellWidth: 22 },
      1: { cellWidth: 38 },
      2: { cellWidth: 38 },
      3: { cellWidth: 50 },
      4: { halign: 'right' }
    }
  });

  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text(
    `Veterinario: ${hist.user?.name || 'Sin registrar'}`,
    15,
    doc.lastAutoTable.finalY + 10
  );

  const fechaPDF = moment(hist.fecha).format('DD_MM_YYYY');
  doc.save(`Historial-${mascota.nombre}-${fechaPDF}.pdf`);
}
export function imprimirVacunaPDF(vacuna, mascota) {
  const doc = new jsPDF();

  // Logo (opcional, si tienes base64 o url pública)
  // doc.addImage('data:image/png;base64,...', 'PNG', 10, 8, 30, 30);

  // Título
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICADO DE VACUNACIÓN', 105, 22, { align: 'center' });

  // Línea decorativa
  doc.setDrawColor(0, 102, 204);
  doc.setLineWidth(1);
  doc.line(20, 26, 190, 26);

  // Datos de la mascota y vacuna en tabla
  autoTable(doc, {
    startY: 32,
    head: [['Campo', 'Detalle']],
    body: [
      ['Nombre de la Mascota', mascota.nombre || '-'],
      ['Propietario', mascota.propietario_nombre || '-'],
      ['Vacuna', vacuna.nombreVacuna || '-'],
      ['Fecha de Vacuna', vacuna.fechaVacuna ? moment(vacuna.fechaVacuna).format('DD/MM/YYYY') : '-'],
      ['Próxima Vacuna', vacuna.fechaProximaVacuna ? moment(vacuna.fechaProximaVacuna).format('DD/MM/YYYY') : '-'],
      ['Observaciones', vacuna.observaciones || '-'],
      ['Veterinario', vacuna.user?.name || '-'],
    ],
    styles: {
      fontSize: 12,
      cellPadding: 4,
      valign: 'middle',
    },
    headStyles: {
      fillColor: [0, 102, 204],
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center',
    },
    bodyStyles: {
      halign: 'left',
    },
    columnStyles: {
      0: { cellWidth: 60, fontStyle: 'bold' },
      1: { cellWidth: 110 },
    },
    theme: 'grid',
    margin: { left: 20, right: 20 }
  });

  // Pie de página
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Clínica Veterinaria - Documento generado automáticamente', 105, 285, { align: 'center' });

  doc.save(`Vacuna-${mascota.nombre}-${vacuna.nombreVacuna}.pdf`);
}
