import { NextFunction, Request, Response } from 'express';
import { employeeService, EmployeeService } from '../services/employee.service';

export class EmployeeController {
  constructor(private readonly service: EmployeeService = employeeService) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employee = await this.service.create(req.body);
      res.status(201).json(employee);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employees = await this.service.findAll();
      res.json(employees);
    } catch (error) {
      next(error);
    }
  };

  findById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const employee = await this.service.findById(req.params.id);
      res.json(employee);
    } catch (error) {
      next(error);
    }
  };
}

export const employeeController = new EmployeeController();
