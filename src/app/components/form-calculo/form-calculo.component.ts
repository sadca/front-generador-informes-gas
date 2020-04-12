import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileItem } from '../../models/file-items.model';
import Swal from 'sweetalert2';
import { CalculosService } from '../../services/calculos.service';

@Component({
  selector: 'app-form-calculo',
  templateUrl: './form-calculo.component.html',
  styleUrls: ['./form-calculo.component.css'],
})
export class FormCalculoComponent implements OnInit {
  @Output() calculoRealizado: EventEmitter<any> = new EventEmitter();

  historico: any[] = [];

  propietario: string;

  tarifa: string;

  terFijoAct: number;
  terEnerAct: number;

  terFijoNew: number;
  terEnerNew: number;

  impuesto: number;
  descuento: number;

  archivo: any;
  archivos: FileItem[] = [];
  estaSobreElemento = false;

  tarifas = [
    { tarifa: '3.1' },
    { tarifa: '3.2' },
    { tarifa: '3.3' },
    { tarifa: '3.4' },
  ];

  constructor(private calculosServ: CalculosService) {
    // this.propietario = 'Prop';
    // this.tarifa = '3.1';
    // this.terFijoAct = 0.317089;
    // this.terEnerAct = 0.054726;
    // this.terFijoNew = 0.251;
    // this.terEnerNew = 0.054496;
    // this.impuesto = 0.00234;
    // this.descuento = 0;
  }

  ngOnInit() {
    this.calculosServ.getConsultas().subscribe((data: any) => {
      this.historico = data.datos;
    });
  }

  calcular(form: any) {
    if (!form.valid || this.archivos.length <= 0) {
      if (this.archivos.length <= 0) {
        Swal.fire({
          type: 'error',
          text: 'Debe adjuntar algún archivo',
          allowOutsideClick: false,
        });
      }
      return;
    }
    const datos = {
      archivo: this.archivos[0],
      propietario: this.propietario,
      tarifa: this.tarifa,
      terFijoAct: this.terFijoAct,
      terEnerAct: this.terEnerAct,
      terFijoNew: this.terFijoNew,
      terEnerNew: this.terEnerNew,
      impuesto: this.impuesto,
      descuento: this.descuento,
    };
    this.calculoRealizado.emit(datos);
  }

  cargarFichero(evento: any) {
    if (evento.srcElement.files[0]) {
      const archivoNuevo = new FileItem(evento.srcElement.files[0]);
      if (this.archivoPuedeCargarse(evento.srcElement.files[0])) {
        if (this.archivos.length < 3) {
          this.archivos.push(archivoNuevo);
        } else {
          Swal.fire({
            type: 'error',
            text: 'Solo puede añadir 3 archivos.',
          });
        }
      }
    }
  }

  // Validaciones
  private archivoPuedeCargarse(archivo: File): boolean {
    if (
      !this.archivoYaSubido(archivo.name) &&
      this.esImagen(archivo.type) &&
      !this.tamanioSuperado(archivo.size)
    ) {
      return true;
    } else {
      return false;
    }
  }

  private archivoYaSubido(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      // tslint:disable-next-line: triple-equals
      if (archivo.nombreArchivo == nombreArchivo) {
        Swal.fire({
          type: 'error',
          text: 'El archivo ' + nombreArchivo + ' ya está agregado.',
        });
        return true;
      }
    }

    return false;
  }

  private esImagen(tipoArchivo: string): boolean {
    return tipoArchivo === '' || tipoArchivo === undefined
      ? false
      : tipoArchivo.startsWith('image') ||
          tipoArchivo.startsWith('application');
  }

  private tamanioSuperado(tamanio: number): boolean {
    tamanio = tamanio / 1024 / 1024;
    if (tamanio > 8) {
      Swal.fire({
        type: 'error',
        text: 'El archivo excede en tamaño.',
      });
      return true;
    } else {
      return false;
    }
  }

  eliminarArchivo(archivo: FileItem) {
    const i = this.archivos.indexOf(archivo);
    if (i !== -1) {
      this.archivos.splice(i, 1);
    }
  }

  eliminarArchivos() {
    this.archivos = [];
  }

  cargar(index: number) {
    console.log(this.historico[index]);
    this.propietario = this.historico[index].propietario;
    this.tarifa = this.historico[index].tarifa;
    this.terFijoAct = this.historico[index].prc_fijo_act;
    this.terEnerAct = this.historico[index].prc_var_act;
    this.terFijoNew = this.historico[index].prc_fijo_new;
    this.terEnerNew = this.historico[index].prc_var_new;
    this.impuesto = this.historico[index].impuesto;
    this.descuento = this.historico[index].descuento;
  }

  tratarCeros(valor: any) {
    if (valor === '0' || valor === 0) {
      return undefined;
    } else {
      return valor;
    }
  }

  borrarRegistro(fecha: Date) {
    const dt = new Date(fecha);
    const fechaString =
      dt.getFullYear().toString().padStart(4, '0') +
      '-' +
      (dt.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      dt.getDate().toString().padStart(2, '0') +
      ' ' +
      dt.getHours().toString().padStart(2, '0') +
      ':' +
      dt.getMinutes().toString().padStart(2, '0') +
      ':' +
      dt.getSeconds().toString().padStart(2, '0');
    // console.log(fechaString);
    Swal.fire({
      type: 'question',
      title: '¿Está seguro que desea borrar el registro seleccionado?',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.calculosServ.borrarConsulta(fechaString).subscribe((data: any) => {
          if (data.ok) {
            Swal.fire('¡Borrado!', 'El registro ha sido eliminado.', 'success');
            this.calculosServ.getConsultas().subscribe((datos: any) => {
              // console.log(data);
              this.historico = datos.datos;
            });
          }
        });
      }
    });
  }
}
