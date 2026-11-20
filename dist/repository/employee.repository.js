"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRepository = exports.MongoEmployeeRepository = void 0;
const employee_model_1 = require("../models/employee.model");
class MongoEmployeeRepository {
    async create(data) {
        return await employee_model_1.Employee.create(data);
    }
    async findAll() {
        return await employee_model_1.Employee.find().sort({ createdAt: -1 });
    }
    async findById(id) {
        return await employee_model_1.Employee.findById(id);
    }
}
exports.MongoEmployeeRepository = MongoEmployeeRepository;
exports.employeeRepository = new MongoEmployeeRepository();
