export class Project
{
	static async getAllProjects(db)
	{
		const [rows] = await db.query('SELECT * FROM Projects;');
		return rows;
	}

	static async createProject(db, project_name)
	{
		const sqlQuery = `INSERT INTO Projects (project_name)
											VALUES (?)`
		await db.query(sqlQuery, [project_name]);
	}

	static async deleteProject(db, project_id)
	{
		const sqlQueryDeleteTasks = `DELETE FROM Tasks
																WHERE project_id = ?;`
		const sqlQueryDeleteProject = `DELETE FROM Projects
																	WHERE project_id = ?;`;

		await db.query(sqlQueryDeleteTasks, [project_id]);
		await db.query(sqlQueryDeleteProject, [project_id]);
	}

	static async renameProject(db, project_id, project_name)
	{
		const sqlQuery = `UPDATE Projects
											SET project_name = ?
											WHERE project_id = ?`;
		await db.query(sqlQuery, [project_name, project_id]);
	}
}