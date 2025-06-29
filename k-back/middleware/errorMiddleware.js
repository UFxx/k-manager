export const errorMiddleware = (err, req, res, next) =>
{
	console.error(err.stack);

	res.status(500).json({
		success: false,
		message: 'Произошла внутренняя ошибка сервера'
	});
};