import { HttpError } from '../errors/http-error';
import {
  employeeRepository,
  EmployeeRepository
} from '../repository/employee.repository';
import { EmployeeDocument } from '../models/employee.model';

export interface CreateEmployeeInput {
  name?: string;
  position?: string;
  baseSalary?: number;
  yearsOfService?: number;
}

export class EmployeeService {
  constructor(private readonly repository: EmployeeRepository = employeeRepository) {}

  async create(input: CreateEmployeeInput): Promise<EmployeeDocument> {
    const { name, position, baseSalary, yearsOfService } = input;

    if (!name || !position) {
      throw new HttpError(400, 'Nombre y puesto son obligatorios');
    }

    if (typeof baseSalary !== 'number' || baseSalary <= 0) {
      throw new HttpError(400, 'El salario base debe ser mayor a 0');
    }

    if (
      typeof yearsOfService !== 'number' ||
      yearsOfService < 0 ||
      !Number.isInteger(yearsOfService)
    ) {
      throw new HttpError(400, 'La antigüedad debe ser un entero mayor o igual a 0');
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

  async findAll(): Promise<EmployeeDocument[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<EmployeeDocument> {
    const employee = await this.repository.findById(id);

    if (!employee) {
      throw new HttpError(404, 'Empleado no encontrado');
    }

    return employee;
  }
}

export const employeeService = new EmployeeService();
