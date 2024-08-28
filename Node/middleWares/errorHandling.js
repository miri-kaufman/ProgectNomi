export const errorHandling = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    console.error(err);
    res.json({
        status: statusCode,
        message: err.message || "מצטערים התרחשה שגיאה בשרת"
    });
};