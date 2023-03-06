module.exports = class ErrorHandler {

    constructor(name) {

        this.name = name

    }

    dublicateError = () => {
        return {
            "message": `${this.name} with this id already exists`,
            "status": `400`
        }
    }

    emptyId = () => {
        return {
            "message": `${this.name} ID is empty`,
            "status": `400`
        }
    }

    notFound = () => {
        return {
            "message": `${this.name} with this id was not found`,
            "status": `404`
        }
    }

    error = (handler) => {
        const error = handler();

        throw new Error(`${error.message}`, {
            cause: {
                status: error.status,
                message: error.message
            }
        });
    }

    triggerError(error) {
        throw new Error(error.message, {
            cause: {
                status: error.status,
                message: error.message
            }
        });
    }
}
