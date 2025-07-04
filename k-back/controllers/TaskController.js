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

	async getTaskById(req, res)
	{
		const { taskId } = req.params;

		if (!taskId) return res.status(400).json({
			success: false,
			message: 'taskId is required'
		})

		return res.json({
			success: true,
			task: await Task.getTaskById(db, taskId)
		})
	}

	async addTask(req, res)
	{
		const { projectId } = req.body;

		if (!projectId) return res.status(400).json({
			success: false,
			message: 'projectId is required'
		})

		const newTask = await Task.addTask(db, projectId);

		return res.json({
			success: true,
			message: 'Задача добавлена',
			task: await newTask
		})
	}

	async deleteTask(req, res)
	{
		const { taskId } = req.params;

		if (!taskId) res.status(400).json({
			success: false,
			message: 'taskId and projectId is required'
		})

		await Task.deleteTask(db, taskId);

		return res.json({
			success: true,
			message: 'Задача удалена',
		})
	}

	async editTask(req, res)
	{
		const { fieldName, newValue, taskId } = req.body;

		if (!fieldName || !newValue || !taskId)
			return res.status(400).json({
				success: false,
				message: "fieldName and newValue and taskId and projectId is required"
			})

		await Task.editTask(db, fieldName, newValue, taskId);

		return res.json({
			success: true,
			message: "Задача изменена",
			task: await Task.getTaskById(db, taskId)
		})
	}
}

export default new TaskController();