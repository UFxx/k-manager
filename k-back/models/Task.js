export class Task
{
	static async getTasksByProjectId(db, project_id)
	{
		const sqlQuery = `SELECT * FROM Tasks
											WHERE project_id = ?;`;
		const [rows] = await db.query(sqlQuery, [project_id]);
		return rows;
	}

	static async getTaskById(db, task_id)
	{
		const sqlQuery = `SELECT * FROM Tasks
											WHERE id = ?;`;
		await db.query(sqlQuery, [task_id]);
	}

	static async addTask(db, project_id)
	{
		const sqlQuery = `INSERT INTO Tasks (project_id)
											VALUES
											(?);`;
		await db.query(sqlQuery, [project_id]);
	}

	static async deleteTask(db, task_id)
	{
		const sqlQuery = `DELETE FROM Tasks
											WHERE id = ?;`;
		await db.query(sqlQuery, [task_id]);
	}

	static async editTask(db, fieldName, newValue, task_id)
	{
		const sqlQuery = `UPDATE Tasks
											SET ${fieldName} = ?
											WHERE id = ?;`;
		await db.query(sqlQuery, [newValue, task_id]);
	}
}