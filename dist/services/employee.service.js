"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeService = exports.EmployeeService = void 0;
const http_error_1 = require("../errors/http-error");
const employee_repository_1 = require("../repository/employee.repository");
class EmployeeService {
    repository;
    constructor(repository = employee_repository_1.employeeRepository) {
        this.repository = repository;
    }
    async create(input) {
        const { name, position, baseSalary, yearsOfService } = input;
        if (!name || !position) {
            throw new http_error_1.HttpError(400, 'Nombre y puesto son obligatorios');
        }
        if (typeof baseSalary !== 'number' || baseSalary <= 0) {
            throw new http_error_1.HttpError(400, 'El salario base debe ser mayor a 0');
        }
        if (typeof yearsOfService !== 'number' ||
            yearsOfService < 0 ||
            !Number.isInteger(yearsOfService)) {
            throw new http_error_1.HttpError(400, 'La antigüedad debe ser un entero mayor o igual a 0');
        }
        const bonus = baseSalary * 0.02 * yearsOfService;
        const finalSalary = baseSalary + bonus;
        const employee = await this.repository.create({
            name,
            position,
            baseSalary,
            yearsOfService,
            finalSalary
        });
        console.log(`Empleado creado: ${employee.name} - salario final: ${employee.finalSalary}`);
        return employee;
    }
    async findAll() {
        return await this.repository.findAll();
    }
    async findById(id) {
        const employee = await this.repository.findById(id);
        if (!employee) {
            throw new http_error_1.HttpError(404, 'Empleado no encontrado');
        }
        return employee;
    }
}
exports.EmployeeService = EmployeeService;
exports.employeeService = new EmployeeService();
