const handleError = (err, req, res, next) => {
    const { statusCode = 500, message = 'Internal Server Error', stack } = err;
    console.log({ statusCode, message, stack });

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
}

module.exports = handleError;