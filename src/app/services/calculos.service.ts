import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { FileItem } from '../models/file-items.model';

@Injectable({
  providedIn: 'root',
})
export class CalculosService {
  webServiceUrl: string;

  constructor(private http: HttpClient) {
    // this.webServiceUrl = 'https://localhost:3000/';
    this.webServiceUrl = 'https://sadca.es:3000/';
  }

  getConsultas() {
    const url = this.webServiceUrl + 'consultasgas';

    const headers: HttpHeaders = new HttpHeaders({
      token: localStorage.getItem('tokenEnergy'),
    });

    return this.http.get(url, { headers });
  }

  getCalculo(datos: any) {
    // console.log(datos);
    const formdata: FormData = new FormData();
    formdata.append('archivo', datos.archivo.archivo);
    formdata.append('propietario', datos.propietario);
    formdata.append('tarifa', datos.tarifa);
    formdata.append('terFijoAct', datos.terFijoAct);
    formdata.append('terEnerAct', datos.terEnerAct);
    formdata.append('terFijoNew', datos.terFijoNew);
    formdata.append('terEnerNew', datos.terEnerNew);
    formdata.append('impuesto', datos.impuesto);
    formdata.append('descuento', datos.descuento);

    const url = this.webServiceUrl + 'gas';

    const headers: HttpHeaders = new HttpHeaders({
      token: localStorage.getItem('tokenEnergy'),
    });

    return this.http.post(url, formdata, { headers });
  }

  login(usuario: string, pass: string) {
    const formdata: FormData = new FormData();
    formdata.append('usuario', usuario);
    formdata.append('pass', pass);

    const url = this.webServiceUrl + 'login';

    return this.http.post(url, formdata);
  }

  estaLogeado() {
    const fechaLogin = new Date(localStorage.getItem('fechaLogin'));
    const hoy = new Date();
    if (fechaLogin.getMilliseconds() - hoy.getMilliseconds() > 7200000) {
      return false;
    } else {
      return true;
    }
  }

  borrarConsulta(fecha: any) {
    const url = this.webServiceUrl + 'consultagas/' + fecha;

    const headers: HttpHeaders = new HttpHeaders({
      token: localStorage.getItem('tokenEnergy'),
    });
    return this.http.delete(url, { headers });
  }
}
