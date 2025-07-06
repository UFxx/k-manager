import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';
import tasksRoutes from './routes/tasksRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

const app = express();

app.use(express.json());
app.use(cors({
	origin: '*'
}));

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', tasksRoutes);

app.use(errorMiddleware);

app.listen(3000, () => console.log('Сервер запущен: http://localhost:3000/'));