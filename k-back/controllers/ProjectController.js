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

	async createProject(req, res)
	{
		const { projectName } = req.body;

		if (!projectName) return res.status(400).json({
			success: false,
			message: "projectName is required"
		})

		await Project.createProject(db, projectName);

		return res.json({
			success: true,
			message: "Проект успешно создан",
			projects: await Project.getAllProjects(db)
		})
	}

	async deleteProject(req, res)
	{
		const { projectId } = req.body;

		if (!projectId) return res.status(400).json({
			success: false,
			message: 'projectId is required'
		})

			await Project.deleteProject(db, projectId);

			return res.json({
				success: true,
				message: 'Проект удален',
				projects: await Project.getAllProjects(db)
			})
	}

	async renameProject(req, res)
	{
		const { projectId, projectName } = req.body;

		if (!projectId || !projectName) return res.status(400).json({
			success: false,
			message: 'projectId and projectName is required'
		})

		await Project.renameProject(db, projectId, projectName);

		return res.json({
			success: true,
			message: 'Проект переименован',
			projects: await Project.getAllProjects(db)
		})
	}
}

export default new ProjectController();