const ConflictError = require("../exceptions/conflict-error");

const errorCheck = (value) => {
    if (value instanceof Error) {
        if (value instanceof ConflictError) {
            
        }
    }
};

module.exports = {errorCheck}