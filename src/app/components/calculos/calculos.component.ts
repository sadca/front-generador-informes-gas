import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CalculosService } from '../../services/calculos.service';
import { ChartDataSets, ChartOptions, ChartYAxe } from 'chart.js';
import { Label } from 'ng2-charts';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import * as jsPdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-calculos',
  templateUrl: './calculos.component.html',
  styles: [],
})
export class CalculosComponent implements OnInit {
  @Input() formulario: any = {
    propietario: 'Usureros',
    tarifa: '2HA',
  };

  @ViewChild('imagen', { static: true }) imagen: ElementRef;

  tiposChart: any[] = [
    { default: false, valor: 'line', nombre: 'Lineas' },
    { default: true, valor: 'bar', nombre: 'Barras' },
    { default: false, valor: 'horizontalBar', nombre: 'Barras Horizontales' },
    { default: false, valor: 'radar', nombre: 'Radar' },
    { default: false, valor: 'doughnut', nombre: 'Donut' },
    { default: false, valor: 'polarArea', nombre: 'Area' },
    { default: false, valor: 'bubble', nombre: 'Burbujas' },
    { default: false, valor: 'pie', nombre: 'Tarta' },
    { default: false, valor: 'scatter', nombre: 'Dispersión' },
  ];

  labelsFecha: Label[] = [];
  labelsTotal: Label[] = ['Total'];

  fijoPagado: number[] = [];
  variablePagado: number[] = [];

  fijoCalculado: number[] = [];
  variableCalculado: number[] = [];

  sumaPagado: number[] = [];
  sumaCalculado: number[] = [];

  datosFijos: ChartDataSets[] = [];
  datosVariables: ChartDataSets[] = [];
  datosSuma: ChartDataSets[] = [];
  datosTotales: ChartDataSets[] = [];

  impuestoPagado: number = 0;
  impuestoCalculado: number = 0;

  totalPagado: number = 0;
  totalCalculado: number = 0;

  public optGrafFijo: ChartOptions = {
    responsive: true,
    showLines: false,
    legend: {
      labels: { fontColor: 'black' },
    },
    scales: {
      xAxes: [
        {
          ticks: { fontColor: 'black', beginAtZero: false },
          gridLines: { color: 'rgba(0,0,0,0.1)' },
        },
      ],
      yAxes: [],
    },
    plugins: {
      datalabels: {
        // Altura
        anchor: 'end',
        align: 'end',
        color: 'black',
      },
    },
  };
  public optGrafVariable: ChartOptions = {
    responsive: true,
    showLines: false,
    legend: {
      labels: { fontColor: 'black' },
    },
    scales: {
      xAxes: [
        {
          ticks: { fontColor: 'black', beginAtZero: false },
          gridLines: { color: 'rgba(0,0,0,0.1)' },
        },
      ],
      yAxes: [],
    },
    plugins: {
      datalabels: {
        // Altura
        anchor: 'end',
        align: 'end',
        color: 'black',
      },
    },
  };
  public optGrafSuma: ChartOptions = {
    responsive: true,
    showLines: false,
    legend: {
      labels: { fontColor: 'black' },
    },
    scales: {
      xAxes: [
        {
          ticks: { fontColor: 'black', beginAtZero: false },
          gridLines: { color: 'rgba(0,0,0,0.1)' },
        },
      ],
      yAxes: [],
    },
    plugins: {
      datalabels: {
        // Altura
        anchor: 'end',
        align: 'end',
        color: 'black',
      },
    },
  };
  public optGrafTotal: ChartOptions = {
    responsive: true,
    showLines: false,
    legend: {
      labels: { fontColor: 'black' },
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [
        {
          ticks: { fontColor: 'black', beginAtZero: false },
          gridLines: { color: 'rgba(0,0,0,0.1)' },
        },
      ],
      yAxes: [],
    },
    plugins: {
      datalabels: {
        // Altura
        anchor: 'end',
        align: 'end',
        color: 'black',
      },
    },
  };

  iva: number = 1.21;

  constructor(private calculoServ: CalculosService, private router: Router) {}

  ngOnInit() {
    Swal.fire({
      type: 'info',
      text: 'Calculando...',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.calculoServ
      .getCalculo(this.formulario)
      .pipe(
        map((data: any) => {
          console.log('Datos antes', data);
          if (data.body) {
            return JSON.parse(data.body);
          } else {
            return data;
          }
        })
      )
      .subscribe(
        (data: any) => {
          console.log('Datos pasados', this.formulario);

          if (!data.ok) {
            Swal.fire({
              type: 'error',
              title: 'Algo ha ocurrido...',
              text:
                'No hemos podido calcular su factura, repita el proceso de nuevo, por favor',
            });
            return;
          } else {
            for (let i = data.results[0].data.length - 1; i >= 0; i--) {
              this.labelsFecha.push(
                this.construirLabel(data.results[0].data[i].fechaInicio) +
                  ' - ' +
                  this.construirLabel(data.results[0].data[i].fechaFin)
              );

              this.fijoPagado.push(
                this.redondear(data.results[0].data[i].costeFijo)
              );
              this.variablePagado.push(
                this.redondear(data.results[0].data[i].costeVariable)
              );
              this.sumaPagado.push(
                this.aplicarDescuento(
                  data.results[0].data[i].costeFijo +
                    data.results[0].data[i].costeVariable
                )
              );
              this.impuestoPagado +=
                this.formulario.impuesto * data.results[0].data[i].activa1;
              this.totalPagado += this.aplicarDescuento(
                data.results[0].data[i].costeFijo +
                  data.results[0].data[i].costeVariable
              );
            }

            for (let i = data.results[1].data.length - 1; i >= 0; i--) {
              this.fijoCalculado.push(
                this.redondear(data.results[1].data[i].costeFijo)
              );
              this.variableCalculado.push(
                this.redondear(data.results[1].data[i].costeVariable)
              );
              this.sumaCalculado.push(
                this.redondear(
                  data.results[1].data[i].costeFijo +
                    data.results[1].data[i].costeVariable
                )
              );
              this.impuestoCalculado +=
                this.formulario.impuesto * data.results[1].data[i].activa1;
              this.totalCalculado +=
                data.results[1].data[i].costeFijo +
                data.results[1].data[i].costeVariable;
            }
          }

          this.datosFijos = [
            { data: this.fijoPagado, label: 'Fijo Pagado' },
            { data: this.fijoCalculado, label: 'Fijo Calculado' },
          ];

          let confEjeY: any = [
            {
              ticks: {
                fontColor: 'black',
                min: Math.trunc(Math.min.apply(null, this.fijoCalculado) / 2),
              },
              gridLines: { color: 'rgba(0,0,0,0.1)' },
            },
          ];
          this.optGrafFijo.scales.yAxes.push(confEjeY);

          this.datosVariables = [
            { data: this.variablePagado, label: 'Variable Pagado' },
            { data: this.variableCalculado, label: 'Variable Calculado' },
          ];

          confEjeY = [
            {
              ticks: {
                fontColor: 'black',
                min: Math.trunc(
                  Math.min.apply(null, this.variableCalculado) / 2
                ),
              },
              gridLines: { color: 'rgba(0,0,0,0.1)' },
            },
          ];
          this.optGrafVariable.scales.yAxes.push(confEjeY);

          this.datosSuma = [
            { data: this.sumaPagado, label: 'Pagado' },
            { data: this.sumaCalculado, label: 'Calculado' },
          ];

          confEjeY = [
            {
              ticks: {
                fontColor: 'black',
                min: Math.trunc(Math.min.apply(null, this.sumaCalculado) / 2),
              },
              gridLines: { color: 'rgba(0,0,0,0.1)' },
            },
          ];
          this.optGrafSuma.scales.yAxes.push(confEjeY);

          this.datosTotales = [
            { data: [this.totalPagado], label: 'Total Pagado' },
            { data: [this.totalCalculado], label: 'Total Calculado' },
          ];
          confEjeY = [
            {
              ticks: {
                fontColor: 'black',
                min: Math.trunc(this.totalCalculado / 2),
              },
              gridLines: { color: 'rgba(0,0,0,0.1)' },
            },
          ];
          this.optGrafTotal.scales.yAxes.push(confEjeY);

          Swal.close();
        },
        (err) => {
          Swal.close();
          console.log(err);
          const error = err;
          // const error = JSON.parse(err.error);
          let mensaje = '';
          if (error.message) {
            mensaje = error.message;
          }
          Swal.fire({
            type: 'error',
            title: 'Algo ha ocurrido...',
            text:
              'No hemos podido calcular su factura, repita el proceso de nuevo, por favor',
            footer: mensaje,
          });
          this.router.navigate(['/home']);
        },
        () => {
          // console.log('Completado');
        }
      );
  }

  construirLabel(label: string): string {
    let result = '';
    const partes = label.split('-');

    const dias = partes[2].split('T')[0];
    const mes = partes[1];
    const anio = partes[0];
    result = dias + '/' + mes + '/' + anio.substr(2, 2);

    return result;
  }

  exportarGrafico(event: any, index: number) {
    const anchor = event.target;

    const element = document.getElementsByTagName('canvas')[index];

    anchor.href = element.toDataURL();

    anchor.download = 'test.png';
  }

  async exportarPDF(event: any) {
    const doc = new jsPdf();

    const mt = 5;
    const ml = 20;

    // Empresa cliente
    // doc.text(this.formulario.propietario, ml, 30);
    doc.setFont('courier');
    doc.setFontSize(10);
    const hoy = new Date();
    // doc.text(
    //   hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear(),
    //   ml,
    //   mt
    // );
    doc.text(this.construirFecha(hoy), ml, mt + 5);

    doc.text('carlos.martinez@sadca.es', ml + 45, mt + 5);
    doc.text('www.sadca.es', ml + 110, mt + 5);

    // Titular
    doc.setFontStyle('bold');
    doc.text('Nombre del titular:', ml, mt + 20);
    doc.setFontStyle('normal');
    doc.text(this.formulario.propietario, ml + 42, mt + 20);

    // Tarifa
    doc.setFontStyle('bold');
    doc.text('Tarifa:', ml, mt + 25);
    doc.setFontStyle('normal');
    doc.text(this.formulario.tarifa, ml + 17, mt + 25);

    // CUPS
    doc.setFontStyle('bold');
    doc.text('CUPS:', ml, mt + 30);
    doc.setFontStyle('normal');
    doc.text(
      this.formulario.archivo.nombreArchivo.split('.')[0],
      ml + 12,
      mt + 30
    );

    doc.text('Precios Tarifa', ml + 85, mt + 40, null, null, 'center');
    doc.text('______________', ml + 85, mt + 40, null, null, 'center');

    doc.autoTable({
      head: [['', 'Término Fijo (€/día)', 'Término Energía (€/kWh)']],
      body: [
        ['Actual', this.formulario.terFijoAct, this.formulario.terEnerAct],
        ['Nueva', this.formulario.terFijoNew, this.formulario.terEnerNew],
      ],
      startY: mt + 45,
      margin: { left: ml, top: mt + 45 },
      tableWidth: 170,
    });

    const anchor = event.target;
    const element = document.getElementsByTagName('canvas')[2];
    anchor.href = element.toDataURL();
    doc.addImage(anchor.href, 'PNG', ml - 5, mt + 80, 180, 100);

    doc.text('Factura Anual', ml + 85, mt + 195, null, null, 'center');
    doc.text('_____________', ml + 85, mt + 195, null, null, 'center');

    const totalPagadoImpuesto = this.totalPagado + this.impuestoPagado;
    const totalCaclcImpuesto = this.totalCalculado + this.impuestoCalculado;
    const totalPagadoIVA = totalPagadoImpuesto * this.iva;
    const totalCalcIVA = totalCaclcImpuesto * this.iva;

    doc.autoTable({
      head: [
        [
          '',
          'Factura Total',
          'Factura Total\n(Impuestos incluidos)',
          'Factura Total\n(IVA incluido)',
        ],
      ],
      body: [
        [
          'Actual',
          this.totalPagado.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
          }),
          totalPagadoImpuesto.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
          }),
          totalPagadoIVA.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
          }),
        ],
        [
          'Calculado',
          this.totalCalculado.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
          }),
          totalCaclcImpuesto.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
          }),
          totalCalcIVA.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
          }),
        ],
        [
          'Ahorro',
          (this.totalPagado - this.totalCalculado).toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
          }),
          (totalPagadoImpuesto - totalCaclcImpuesto).toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
          }),
          (totalPagadoIVA - totalCalcIVA).toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 2,
          }),
        ],
      ],
      startY: mt + 200,
      margin: { left: ml, top: mt + 230 },
      tableWidth: 170,
    });

    doc.setFontSize(7);
    const textoPrimerGrafico =
      // tslint:disable-next-line: max-line-length
      'El presente informe se ha realizado utilizando los datos energéticos del ultimo año móvil, SADCA Energy no se hace responsable de que se alcance el ahorro estimado si hay cambios en el consumo o en el marco regulatorio. El contenido de este estudio es meramente informativo.';
    const textoCortado = doc.splitTextToSize(textoPrimerGrafico, 150);
    doc.text(textoCortado, ml, mt + 275, { maxWidth: 170, align: 'justify' });

    // logo de la empresa en la esquina superior derecha
    await html2canvas(this.imagen.nativeElement).then((canvas) => {
      doc.addImage(canvas.toDataURL(), 'JPEG', 180, 5, 20, 8);
    });

    doc.save(`calculo-${this.formulario.propietario}.pdf`);
  }

  aplicarDescuento(valor: number) {
    valor = valor - (valor * this.formulario.descuento) / 100;
    valor = this.redondear(valor);
    return valor;
  }

  redondear(valor: number) {
    valor = Math.round(valor * 100);
    return valor / 100;
  }

  construirFecha(fecha: Date) {
    let cadena: string = '';
    if (fecha.getDate() < 10) {
      cadena += '0' + fecha.getDate() + '/';
    } else {
      cadena += fecha.getDate() + '/';
    }
    if (fecha.getMonth() + 1 < 10) {
      cadena += '0' + (fecha.getMonth() + 1) + '/';
    } else {
      cadena += fecha.getMonth() + 1 + '/';
    }
    cadena += fecha.getFullYear();

    return cadena;
  }
}
