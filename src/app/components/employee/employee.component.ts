import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  employee: Employee = { name: '', email: '', department: 'HR' };
  employees: Employee[] = [];
  searchId: number = 0;
  searchName: string = '';
  isUpdating: boolean = false;
  modalMessage: string = '';

  

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }


  loadEmployees() {
    this.employeeService.getAll().subscribe((data) => {
      this.employees = data;
    });
  }


  saveEmployee() {
    if (this.employee.name && this.employee.email && this.employee.department) {
      if (this.isUpdating) {
    
        this.employeeService.updateEmployee(this.employee).subscribe(() => {
          alert('Employee updated successfully!');
          this.loadEmployees();
          this.resetForm();
        });
      } else {

        this.employeeService.addEmployee(this.employee).subscribe(() => {
          alert('Employee added successfully!');
          this.loadEmployees();
          this.resetForm();
        });
      }
    } else {
      alert('Please fill all fields!');
    }
  }


  editEmployee(emp: Employee) {
    this.employee = { ...emp };
    this.isUpdating = true;
  }

 
  deleteEmployee(id: number | undefined) {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.employeeService.deleteEmployee(id).subscribe(() => {
          alert('Employee deleted!');
          this.loadEmployees();
        });
      }
    }
  }

  searchEmployeeById() {
    if (this.searchId > 0) {
      this.employeeService.getById(this.searchId).subscribe((emp) => {
        this.employees = [emp]; 
      }, (error) => {
        alert('Employee not found with ID: ' + this.searchId);
        this.loadEmployees(); 
      });
    }
  }

  
  searchEmployeeByName() {
    if (this.searchName.trim() !== '') {
      this.employeeService.getByName(this.searchName).subscribe((data) => {
        this.employees = data;
      }, (error) => {
        alert('No employees found with Name: ' + this.searchName);
        
        this.loadEmployees();
      });
    }
  }


  resetForm() {
    this.employee = { name: '', email: '', department: 'HR' };
    this.isUpdating = false;
  }
}