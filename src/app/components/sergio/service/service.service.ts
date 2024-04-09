import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private http:HttpClient) { }

  apiUrl = 'https://backcambamaster-production.up.railway.app';

  login(data:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, data)
  }

  registro(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, data);
  }

  recuperar(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar`, data);
  }

  getAllProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/obtenerProductos`);
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/productos/${id}`, producto);
  }

  getCategorias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/categorias`);
  }

  getEstadoProducto(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/estadoProducto`);
  }

  eliminarProducto(identificador: number): Observable<any> {
    const url = `${this.apiUrl}/api/productos/${identificador}`;
    return this.http.delete<any>(url);
  }


}
