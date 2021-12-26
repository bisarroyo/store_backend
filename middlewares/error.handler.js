function logError(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function errorHandler(err, req, res, next) {
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
}

function boonErrorHandler(err, req, res, next) {
    if(err.isBoom) {
        res.status(err.output.statusCode).json({
            error: err.output.payload
        });
    }
    next(err);
}

module.exports = { logError, errorHandler, boonErrorHandler };