const handleError = (err, req, res, next) => {
    const { status = 500, message = 'Internal Server Error', stack } = err;
    console.log({ status, message, stack });

    res.status(status).json({
        status,
        message
    });
}

module.exports = handleError;