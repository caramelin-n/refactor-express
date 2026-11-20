import { Router } from 'express';
import { employeeController } from '../controllers/employee.controller';

const router = Router();

router.post('/', employeeController.create);
router.get('/', employeeController.findAll);
router.get('/:id', employeeController.findById);

export default router;
