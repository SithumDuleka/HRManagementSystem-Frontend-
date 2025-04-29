import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080/employee'

  constructor(private http: HttpClient) { }
   getAll(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.baseUrl}/get-all`)
   }
}
