export class Task
{
	static async getTasksByProjectId(db, project_id)
	{
		const sqlQuery = `SELECT * FROM Tasks
											WHERE project_id = ?
											AND is_completed = FALSE;`;
		const [rows] = await db.query(sqlQuery, [project_id]);
		return rows;
	}

	static async getTaskById(db, task_id)
	{
		const sqlQuery = `SELECT * FROM Tasks
											WHERE id = ?;`;
		const [rows] = await db.query(sqlQuery, [task_id]);
		return rows[0];
	}

	static async addTask(db, project_id)
	{
		const sqlQuery = `INSERT INTO Tasks (project_id)
											VALUES
											(?);`;
		const [result] = await db.query(sqlQuery, [project_id]);

		const taskId = result.insertId;

		return this.getTaskById(db, taskId);
	}

	static async deleteTask(db, task_id)
	{
		const sqlQuery = `DELETE FROM Tasks
											WHERE id = ?;`;
		await db.query(sqlQuery, [task_id]);
	}

	static async editTask(db, location, available, importance, status, comment, task_id)
	{
		const sqlQuery = `UPDATE Tasks
											SET location = ?,
											available = ?,
											importance = ?,
											status = ?,
											comment = ?
											WHERE id = ?;`;
		await db.query(sqlQuery, [location, available, importance, status, comment, task_id]);
	}

	static async bulkDelete(db, task_ids)
	{
		const sqlQuery = `DELETE FROM Tasks
										WHERE id IN (?);`;
		await db.query(sqlQuery, [task_ids])
	}
}