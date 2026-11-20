import { Employee, EmployeeDocument } from '../models/employee.model';

export interface CreateEmployeeData {
  name: string;
  position: string;
  baseSalary: number;
  yearsOfService: number;
  finalSalary: number;
}

export interface EmployeeRepository {
  create(data: CreateEmployeeData): Promise<EmployeeDocument>;
  findAll(): Promise<EmployeeDocument[]>;
  findById(id: string): Promise<EmployeeDocument | null>;
}

export class MongoEmployeeRepository implements EmployeeRepository {
  async create(data: CreateEmployeeData): Promise<EmployeeDocument> {
    return await Employee.create(data);
  }

  async findAll(): Promise<EmployeeDocument[]> {
    return await Employee.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<EmployeeDocument | null> {
    return await Employee.findById(id);
  }
}

export const employeeRepository: EmployeeRepository = new MongoEmployeeRepository();
