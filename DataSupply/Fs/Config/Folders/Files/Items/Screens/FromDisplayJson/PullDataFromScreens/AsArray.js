//let CommonPull = require("./Pull");
let CommonPullData = require("../../../PullData/FromDisplayJson/PullFromDisplayJson");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inDataPk }) => {
    
    if (inDataPk > 0) {
        let LocalData = await CommonPullData.FromItemName({
            inFolderName, inFileNameWithExtension, inItemName,
            inDataPk
        });
        return await Object.keys(LocalData);
    };
};

module.exports = {
    StartFunc
};