import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import ProjectController from '../controllers/ProjectController.js';

const router = express.Router();

router.get('/', asyncHandler(ProjectController.getAllProjects));
router.get('/:projectId', asyncHandler(ProjectController.getProjectById));
router.post('/', asyncHandler(ProjectController.createProject));
router.delete('/:projectId', asyncHandler(ProjectController.deleteProject));
router.patch('/', asyncHandler(ProjectController.renameProject));

export default router;