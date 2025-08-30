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

	async getCompletedTasks(_, res)
	{
		return res.json({
			success: true,
			tasks: await Task.getCompletedTasks(db)
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

		const currentDate = new Date();
		const formattedDate = currentDate.toLocaleDateString('en-CA');

		const newTask = await Task.addTask(db, projectId, formattedDate);

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

	async bulkDelete(req, res)
	{
		const { taskIds } = req.body;

		if (!taskIds) return res.status(400).json({
			success: false,
			message: 'taskIds is required'
		})

		await Task.bulkDelete(db, taskIds);

		return res.json({
			success: true,
			message: 'Задачи удалены',
		})
	}

	async editTask(req, res)
	{
		const { location, available, importance, status, comment, taskId } = req.body;

		const isCompleted = status === 3;

		const currentDate = new Date();
		const formattedDate = currentDate.toLocaleDateString('en-CA');

		if (location === undefined || available === undefined || !importance || status === undefined || comment === undefined || !taskId)
			return res.status(400).json({
				success: false,
				message: "location, available, importance, status, comment, taskId is required"
			})

		await Task.editTask(db, location, available, importance, status, comment, isCompleted, isCompleted ? formattedDate : null, taskId)

		return res.json({
			success: true,
			message: "Задача изменена",
			task: await Task.getTaskById(db, taskId)
		})
	}

	async returnCompletedTask(req, res)
	{
		const { taskId } = req.body;

		if (!taskId)
			return res.status(400).json({
				success: false,
				message: 'taskId is required'
			})

		await Task.returnCompletedTask(db, taskId);

		return res.json({
			success: true,
			message: 'Задача возвращена',
			task: await Task.getTaskById(db, taskId)
		})
	}

	async getAllTasksStat(_, res)
	{
		return res.status(200).json({
			success: true,
			stat: await Task.getAllTasksStat(db)
		})
	}
}

export default new TaskController();