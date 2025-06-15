export const errorHandler = (err, req, res) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({
    status,
    message: err.name || 'InternalServerError',
    data: message,
  });
};
