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

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Fetch all employees
  loadEmployees() {
    this.employeeService.getAll().subscribe((data) => {
      this.employees = data;
    });
  }

  // Add a new employee
  // addEmployee() {
  //   if (this.employee.name && this.employee.email && this.employee.department) {
  //     this.employeeService.addEmployee(this.employee).subscribe(() => {
  //       alert('Employee added successfully!');
  //       this.loadEmployees(); // Reload list
  //       this.employee = { name: '', email: '', department: 'HR' }; // Reset form
  //     });
  //   } else {
  //     alert('Please fill all fields!');
  //   }
  // }

  // Delete an employee
  // deleteEmployee(id: number | undefined) {
  //   if (id !== undefined) {
  //     if (confirm('Are you sure you want to delete this employee?')) {
  //       this.employeeService.deleteEmployee(id).subscribe(() => {
  //         alert('Employee deleted!');
  //         this.loadEmployees(); // Reload list
  //       });
  //     }
  //   }
  // }
}