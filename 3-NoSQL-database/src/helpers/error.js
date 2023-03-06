module.exports = triggerError = (error) => {
    throw new Error(error.message, {
        cause: {
            status: error.status,
            message: error.message
        }
    });
}