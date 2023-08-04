import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from '../../../services/venta.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
  var year = date.getFullYear();

  // Ensuring 2 digits by adding a preceding 0 if day or month is less than 10
  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;

  return `${day}-${month}-${year}`
}

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.css'],
})
export class VentaDetalleComponent implements OnInit {
  public id: any;
  public venta: any = {
    user: '',
    client: '',
  };
  public detalle_venta: any;
  //
  title = 'html-to-pdf-angular-application';
  public convertToPDF() {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const date = new Date(this.venta.fecha)
    const formattedDate = formatDate(date)

    const HORIZONTAL_LINE = '--------------------------------------------------------------------------------------'

    pdf.setFontSize(26)
    pdf.setFont('times', 'bold', 800)
    pdf.text('Detalle de venta', 70, 15)

    pdf.setFont('times', undefined, undefined)
    pdf.setFontSize(14)

    pdf.text(`Numero de venta ${this.venta._id}`, 10, 30)

    pdf.text(`Cliente: ${this.venta.client.nombre} ${this.venta.client.apellido}`, 10, 40)
    pdf.text(`Email: ${this.venta.client.email}`, 10, 50)
    pdf.text(`Fecha: ${formattedDate}`, 10, 60)

    pdf.text(`Vendedor: ${this.venta.user.nombre} ${this.venta.user.apellido}`, 10, 70)

    pdf.text(HORIZONTAL_LINE, 10, 90)

    let lineHeight = 100
    let total = 0

    this.detalle_venta.forEach((item, index) => {
      pdf.text(`• ${item.idproducto.titulo} (${item.idproducto.modelo}) $${item.idproducto.precio}`, 10, lineHeight);
      lineHeight += 10;
      total += item.idproducto.precio
    });

    pdf.text(HORIZONTAL_LINE, 10, lineHeight)
    lineHeight += 10

    pdf.setFontSize(20)
    pdf.text(`Total: $${total}`, 100, lineHeight)


    const filename = `venta_${this.venta.client.nombre}_${this.venta.client.apellido}_${formattedDate}.pdf`
    pdf.save(filename)

  }

  constructor(
    private _route: ActivatedRoute,
    private _ventaService: VentaService
  ) {
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this._ventaService.data_venta(this.id).subscribe((response) => {
        this.venta = response.data.venta;
        this.detalle_venta = response.data.detalles;
        console.log(this.venta)
      });
    });
  }
}
