let CommonTableFuncs = require("../CommonTableFuncs/Update");

let WithPk = ({ inJsonConfig, inItemConfig, inUserPK, inPostData }) => {
    return new Promise((resolve, reject) => {
        CommonTableFuncs.WithPk({ inJsonConfig, inItemConfig, inUserPK, inPostData }).then(PromiseData => {
            if (PromiseData.KTF) {
                resolve(PromiseData);
            };
        }).catch(reject);
    });
};

module.exports = { WithPk };