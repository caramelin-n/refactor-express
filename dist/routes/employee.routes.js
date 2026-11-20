"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const router = (0, express_1.Router)();
router.post('/', employee_controller_1.employeeController.create);
router.get('/', employee_controller_1.employeeController.findAll);
router.get('/:id', employee_controller_1.employeeController.findById);
exports.default = router;
