import { Project } from '../models/Project.js';
import db from '../config/db.js';

class ProjectController
{
	async getAllProjects(_, res)
	{
			res.json({
				success: true,
				projects: await Project.getAllProjects(db)
			})
	}

	async getProjectById(req, res)
	{
		const { projectId } = req.params;

		if (!projectId) return res.status(400).json({
			success: false,
			message: 'projectId is required'
		})

		return res.json({
			success: true,
			project: await Project.getProjectById(db, projectId)
		})
	}

	async createProject(_, res)
	{
		const newProject = await Project.createProject(db, 'Новый проект');

		return res.json({
			success: true,
			message: "Проект создан",
			project: await newProject
		})
	}

	async deleteProject(req, res)
	{
		const { projectId } = req.params;

		if (!projectId) return res.status(400).json({
			success: false,
			message: 'projectId is required'
		})

			await Project.deleteProject(db, projectId);

			return res.json({
				success: true,
				message: 'Проект удален',
			})
	}

	async renameProject(req, res)
	{
		const { projectId, projectName } = req.body;

		if (!projectId || projectName === undefined) return res.status(400).json({
			success: false,
			message: 'projectId and projectName is required'
		})

		const renamedProject = await Project.renameProject(db, projectId, projectName);

		return res.json({
			success: true,
			message: 'Проект переименован',
			project: renamedProject
		})
	}
}

export default new ProjectController();