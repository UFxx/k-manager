import mysql from 'mysql2';

const pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'kdb',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
})

export default pool.promise();