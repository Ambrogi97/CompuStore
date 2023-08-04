import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../../../services/estadistica.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent implements OnInit {
  view: [number, number] = [700, 400];
  domain: any;
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  countVentasBySeller: { id: string, nombre: string, ventas: number }[] = []
  countProdByCategory: { id: string, nombre: string, productos: number }[] = []

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(
    private readonly reportService: ReportService
  ) { }

  get countVentas() {
    return this.countVentasBySeller.map(x => ({
      name: x.nombre,
      value: x.ventas
    }))
  }

  get countProducts() {
    return this.countProdByCategory.map(x => ({
      name: x.nombre,
      value: x.productos
    }))
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    this.reportService.getCountVentasBySeller().subscribe(
      (res) => {
        this.countVentasBySeller = res
      },
      (err) => { }
    )
    this.reportService.getCountProdByCategory().subscribe(
      (res) => {
        this.countProdByCategory = res
      },
      (err) => { }
    )
  }
}
