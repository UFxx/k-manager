import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import TaskController from '../controllers/TaskController.js';

const router = express.Router();

router.get('/project/:projectId', asyncHandler(TaskController.getTasksByProjectId));
router.get('/:taskId', asyncHandler(TaskController.getTaskById));
router.post('/', asyncHandler(TaskController.addTask));
router.delete('/:taskId', asyncHandler(TaskController.deleteTask));
router.patch('/', asyncHandler(TaskController.editTask));

export default router;