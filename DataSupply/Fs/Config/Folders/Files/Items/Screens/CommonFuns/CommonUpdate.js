let _ = require("lodash");

let UpdateKeysNeededOnly =  ({ inFindColumnObject, inDataToUpdate }) => {
    _.forOwn(inDataToUpdate, function (value, key) {
        _.set(inFindColumnObject, key, value);
    });
};

module.exports = {
    UpdateKeysNeededOnly
};