import jsPDF from 'jspdf'
// Si tienes un logo base64 directamente:
import logoBase64 from 'assets/logo_base64.js' // export default 'data:image/png;base64,...'

export function generarPdfVentaOasis(data) {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: [80, 200]
  });

  let y = 5;
  const lineSpacing = 5;

  // LOGO (tamaño ajustado al ancho de 80mm)
  if (logoBase64) {
    doc.addImage(logoBase64, 'PNG', 25, y, 25, 20); // centrado en 80mm (25+30=55)
    y += 25;
  }

  // TÍTULO
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Comprobante de Venta', 40, y, { align: 'center' });
  y += lineSpacing ;
  // coloca el ID

  doc.setFontSize(10);
  doc.text(`N°: ${data.sale.id}`, 40, y, { align: 'center' });
  y += lineSpacing ;

  // INFO CLIENTE
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text(`Fecha: ${new Date(data.sale.fecha).toLocaleString()}`, 5, y);
  y += lineSpacing;
  doc.text(`Cliente: ${data.sale.nombre || '-'}`, 5, y);
  y += lineSpacing;
  doc.text(`CI: ${data.sale.ci || '-'}`, 5, y);
  y += lineSpacing;
  if (data.sale.comentario) {
    doc.text(`Comentario: ${data.sale.comentario}`, 5, y);
    y += lineSpacing;
  }

  // DETALLE
  y += lineSpacing;
  doc.setFont(undefined, 'bold');
  doc.text('DETALLE DE PRODUCTOS', 40, y, { align: 'center' });
  doc.setDrawColor(0);
  doc.line(5, y + 1, 75, y + 1);
  doc.setFont(undefined, 'normal');
  y += lineSpacing;

  data.detalles.forEach((item) => {
    const precio = Number(item.precio).toFixed(2);
    const subTotal = Number(item.subtotal).toFixed(2);
    doc.text(`${item.productoName}`, 5, y);
    y += lineSpacing;
    doc.text(`  ${item.cantidad} x ${precio} = ${subTotal} Bs`, 5, y);
    y += lineSpacing;
  });

  // TOTAL
  y += lineSpacing;
  doc.setFont(undefined, 'bold');
  doc.setFontSize(11);
  doc.text(`TOTAL: ${Number(data.sale.total).toFixed(2)} Bs`, 5, y);
  y += lineSpacing * 2;

  // PIE DE PÁGINA
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  doc.text('Gracias por su compra', 40, y, { align: 'center' });

  doc.save('comprobante-oasis.pdf');
}
