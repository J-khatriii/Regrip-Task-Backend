export const errorHandler = (err, req, res, next) => {
    console.log(err);

    const status = err.statusCode || 500;
    const message = err.message || "Internal server error";

    res.status(status).json({
        sucess: false,
        message,
    });
}
