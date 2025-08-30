import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import TaskController from '../controllers/TaskController.js';

const router = express.Router();

router.get('/project/:projectId', asyncHandler(TaskController.getTasksByProjectId));
router.get('/completed', asyncHandler(TaskController.getCompletedTasks));
router.patch('/completed', asyncHandler(TaskController.returnCompletedTask));
router.get('/completed/stat', asyncHandler(TaskController.getAllTasksStat));
router.post('/bulkDelete', asyncHandler(TaskController.bulkDelete));
router.get('/:taskId', asyncHandler(TaskController.getTaskById));
router.post('/', asyncHandler(TaskController.addTask));
router.delete('/:taskId', asyncHandler(TaskController.deleteTask));
router.patch('/', asyncHandler(TaskController.editTask));

export default router;