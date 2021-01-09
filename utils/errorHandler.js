module.exports = (res, error) => {
  res.status(500).json({
    success: false,
    message: error.message ? error.message : error,
    // * если у error есть поле message, то мы его показываем, если нет, то показываем всё ошибку целиком
  });
};
