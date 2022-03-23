const error_handle = (res,message,code) => {
    return res.status(code).json({
        code,
        message,
    })
};

module.exports = error_handle;