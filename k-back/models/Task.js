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

	static async getCompletedTasks(db)
	{
		const sqlQuery = `SELECT * FROM Tasks
											WHERE is_completed = TRUE;`
		const [rows] = await db.query(sqlQuery);
		return rows;
	}

	static async getTaskById(db, task_id)
	{
		const sqlQuery = `SELECT * FROM Tasks
											WHERE id = ?;`;
		const [rows] = await db.query(sqlQuery, [task_id]);
		return rows[0];
	}

	static async addTask(db, project_id, date)
	{
		const sqlQuery = `INSERT INTO Tasks (project_id, created_at)
											VALUES
											(?, ?);`;
		const [result] = await db.query(sqlQuery, [project_id, date]);

		const taskId = result.insertId;

		return this.getTaskById(db, taskId);
	}

	static async deleteTask(db, task_id)
	{
		const sqlQuery = `DELETE FROM Tasks
											WHERE id = ?;`;
		await db.query(sqlQuery, [task_id]);
	}

	static async editTask(db, location, available, importance, status, comment, is_completed, completed_at, task_id)
	{
		const sqlQuery = `UPDATE Tasks
											SET location = ?,
											available = ?,
											importance = ?,
											status = ?,
											comment = ?,
											is_completed = ?,
											completed_at = ?
											WHERE id = ?;`;
		await db.query(sqlQuery, [location, available, importance, status, comment, is_completed, completed_at, task_id]);
	}

	static async bulkDelete(db, task_ids)
	{
		const sqlQuery = `DELETE FROM Tasks
											WHERE id IN (?);`;
		await db.query(sqlQuery, [task_ids])
	}

	static async returnCompletedTask(db, task_id)
	{
		const sqlQuery = `UPDATE Tasks
											SET status = 0,
											is_completed = 0,
											completed_at = NULL
											WHERE id = ?;`;
		await db.query(sqlQuery, task_id);
	}

	static async getCreatedTasksStat(db)
	{
		const sqlQuery = `SELECT status, COUNT(*) as 'count'
											FROM Tasks
											GROUP BY status;`;
		const [rows] = await db.query(sqlQuery);
		return rows;
	}

	static async getTasksStatByDate(db)
	{
		const sqlQuery = `SELECT
												completed_at,
												COUNT(*) AS count
											FROM Tasks
											WHERE completed_at IS NOT NULL
											GROUP BY completed_at
											ORDER BY completed_at;`;
		const [rows] = await db.query(sqlQuery);
		return rows;
	}
}