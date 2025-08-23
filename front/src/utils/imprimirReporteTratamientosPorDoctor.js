// src/utils/imprimirReporteTratamientosPorDoctor.js
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const n = (v) => Number(v || 0).toFixed(2)

export function imprimirReporteTratamientosPorDoctor(reporte, fecha) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'A4' })
  const formattedDate = new Date(fecha).toLocaleDateString()

  // Título
  doc.setFontSize(16)
  doc.text('REPORTE DE TRATAMIENTOS POR DOCTOR', 14, 15)
  doc.setFontSize(10)
  doc.text(`Fecha: ${formattedDate}`, 14, 22)

  let currentY = 28

  // Por cada doctor
  for (const doctor in reporte) {
    const tratamientos = reporte[doctor] || []

    // Totales por doctor
    const totalCantidad = tratamientos.length
    const totalBs = tratamientos.reduce((acc, r) => acc + Number(r.costo || 0), 0)

    // Encabezado de doctor
    doc.setFontSize(10)
    doc.text(`Doctor: ${doctor}`, 12, currentY)

    // Filas con medicamentos (multilínea)
    const body = tratamientos.map(r => {
      const medsText = (r.medicamentos || [])
        .map(m =>
          `• ${m.medicamento || ''}${m.productoNombre ? ` (${m.productoNombre})` : ''} — ${m.cantidad} x ${n(m.precio)} = ${n(m.total || (m.cantidad * m.precio))}`
        )
        .join('\n')

      return [
        r.nroFicha ?? '',
        r.detalle || '',
        '1',
        n(r.costo),
        medsText || 'Sin medicamentos'
      ]
    })

    autoTable(doc, {
      startY: currentY + 4,
      head: [['Nro Ficha', 'Detalle', 'Cant', 'Bs', 'Medicamentos / Productos']],
      body,
      styles: {
        fontSize: 8,
        cellPadding: 1.5,
        overflow: 'linebreak',
        valign: 'top'
      },
      headStyles: {
        fillColor: [22, 160, 133],
        fontSize: 8
      },
      theme: 'grid',
      margin: { left: 12, right: 12 },
      // Ancho de columnas para A4 con márgenes (total ~186mm)
      columnStyles: {
        0: { cellWidth: 20, halign: 'center' }, // Nro Ficha
        1: { cellWidth: 60 },                    // Detalle
        2: { cellWidth: 12, halign: 'center' },  // Cant
        3: { cellWidth: 20, halign: 'right' },   // Bs
        4: { cellWidth: 74 }                     // Medicamentos / Productos (multilínea)
      },
      didDrawPage(data) {
        currentY = data.cursor.y
      }
    })

    // Totales por doctor debajo de la tabla
    const finalY = (doc.lastAutoTable && doc.lastAutoTable.finalY) || currentY
    doc.setFont(undefined, 'bold')
    doc.text(`TOTAL TRATAMIENTOS: ${totalCantidad}`, 100, finalY + 6)
    doc.text(`TOTAL Bs: ${n(totalBs)}`, 180, finalY + 6, { align: 'right' })
    doc.setFont(undefined, 'normal')

    currentY = finalY + 10
    if (currentY > 260) {
      doc.addPage()
      currentY = 20
    }
  }

  doc.save(`Reporte-Tratamientos-${formattedDate}.pdf`)
}
