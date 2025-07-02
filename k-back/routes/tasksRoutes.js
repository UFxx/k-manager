import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import TaskController from '../controllers/TaskController.js';

const router = express.Router();

router.get('/:projectId', asyncHandler(TaskController.getTasksByProjectId));
router.post('/create', asyncHandler(TaskController.addTask));
router.delete('/delete', asyncHandler(TaskController.deleteTask));
router.patch('/edit', asyncHandler(TaskController.editTask));

export default router;