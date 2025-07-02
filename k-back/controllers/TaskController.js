import { Task } from "../models/Task.js";
import db from "../config/db.js";

class TaskController
{
	async getTasksByProjectId(req, res)
	{
		const { projectId } = req.params;

		if (!projectId) return res.status(400).json({
			success: false,
			message: 'projectId is required'
		})

		return res.json({
			success: true,
			tasks: await Task.getTasksByProjectId(db, projectId)
		})
	}

	async addTask(req, res)
	{
		const { projectId } = req.body;

		if (!projectId) return res.status(400).json({
			success: false,
			message: 'projectId is required'
		})

		await Task.addTask(db, projectId);

		return res.json({
			success: true,
			message: 'Задача добавлена',
			tasks: await Task.getTasksByProjectId(db, projectId)
		})
	}

	async deleteTask(req, res)
	{
		const { taskId, projectId } = req.body;

		if (!taskId || !projectId) res.status(400).json({
			success: false,
			message: 'taskId and projectId is required'
		})

		await Task.deleteTask(db, taskId);

		return res.json({
			success: true,
			message: 'Задача удалена',
			tasks: await Task.getTasksByProjectId(db, projectId)
		})
	}

	async editTask(req, res)
	{
		const { fieldName, newValue, taskId, projectId } = req.body;

		if (!fieldName || !newValue || !taskId || !projectId)
			return res.status(400).json({
				success: false,
				message: "fieldName and newValue and taskId and projectId is required"
			})

		await Task.editTask(db, fieldName, newValue, taskId);

		return res.json({
			success: true,
			message: "Задача изменена",
			tasks: await Task.getTasksByProjectId(db, projectId)
		})
	}
}

export default new TaskController();