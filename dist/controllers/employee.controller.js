"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeController = exports.EmployeeController = void 0;
const employee_service_1 = require("../services/employee.service");
class EmployeeController {
    service;
    constructor(service = employee_service_1.employeeService) {
        this.service = service;
    }
    create = async (req, res, next) => {
        try {
            const employee = await this.service.create(req.body);
            res.status(201).json(employee);
        }
        catch (error) {
            next(error);
        }
    };
    findAll = async (_req, res, next) => {
        try {
            const employees = await this.service.findAll();
            res.json(employees);
        }
        catch (error) {
            next(error);
        }
    };
    findById = async (req, res, next) => {
        try {
            const employee = await this.service.findById(req.params.id);
            res.json(employee);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.EmployeeController = EmployeeController;
exports.employeeController = new EmployeeController();
