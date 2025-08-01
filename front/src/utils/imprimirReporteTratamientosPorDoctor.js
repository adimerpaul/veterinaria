// src/utils/imprimirReporteTratamientosPorDoctor.js
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function imprimirReporteTratamientosPorDoctor(reporte, fecha) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'A4'
  })
  const formattedDate = new Date(fecha).toLocaleDateString()

  doc.setFontSize(16)
  doc.text('REPORTE DE TRATAMIENTOS POR DOCTOR', 14, 15)
  doc.setFontSize(10)
  doc.text(`Fecha: ${formattedDate}`, 14, 22)

  let currentY = 28

  for (const doctor in reporte) {
    const tratamientos = reporte[doctor]
    const totalCantidad = tratamientos.length
    const totalBs = tratamientos.reduce((acc, r) => acc + Number(r.costo), 0).toFixed(2)

    doc.setFontSize(10)
    doc.text(`Doctor: ${doctor}`, 12, currentY)

    autoTable(doc, {
      startY: currentY + 4,
      head: [['Nro Ficha', 'Detalle', 'Cant', 'Bs']],
      body: tratamientos.map(r => [
        r.nroFicha,
        r.detalle,
        '1',
        r.costo
      ]),
      styles: {
        fontSize: 8,           // más pequeño
        cellPadding: 1.5       // más compacto
      },
      margin: { left: 12, right: 12 },
      theme: 'grid',
      headStyles: {
        fillColor: [22, 160, 133],
        fontSize: 8
      },
      didDrawPage: function (data) {
        currentY = data.cursor.y
      }
    })

    // Total por doctor
    doc.setFontSize(10)
    doc.setFont(undefined, 'bold')
    doc.text(`TOTAL TRATAMIENTOS: ${totalCantidad}`, 100, currentY + 6)
    doc.text(`TOTAL Bs: ${totalBs}`, 180, currentY + 6, { align: 'right' })
    doc.setFont(undefined, 'normal')

    currentY += 8
    if (currentY > 260) {
      doc.addPage()
      currentY = 20
    }
  }

  doc.save(`Reporte-Tratamientos-${formattedDate}.pdf`)
}
