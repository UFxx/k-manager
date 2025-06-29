import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import ProjectController from '../controllers/ProjectController.js';

const router = express.Router();

router.get('/', asyncHandler(ProjectController.getAllProjects));
router.post('/create', asyncHandler(ProjectController.createProject));
router.delete('/delete', asyncHandler(ProjectController.deleteProject));
router.patch('/update', asyncHandler(ProjectController.renameProject));

export default router;