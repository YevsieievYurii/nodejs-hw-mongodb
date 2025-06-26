export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const messages = error.details.map((detail) => detail.message).join(', ');
    res.status(400).json({
      status: 'error',
      message: messages,
    });
  }
};
