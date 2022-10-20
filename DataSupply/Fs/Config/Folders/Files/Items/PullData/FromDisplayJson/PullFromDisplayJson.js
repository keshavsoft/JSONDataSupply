//let CommonCheck = require("../../../Check");
let CommonPullData = require("../../../PullData/FromConfig");

let FromItemName = async ({ inFolderName, inFileNameWithExtension, inItemName, inDataPk }) => {
    if (inDataPk > 0) {
        let LocalReturnData;
        let LocalOriginalData;
        let LocalFolderName = inFolderName;

        LocalOriginalData = await CommonPullData.FromFolderAndFile({
            inFolderName: LocalFolderName,
            inFileNameWithExtension, inUserPK: inDataPk
        });

        if (inItemName in LocalOriginalData) {
            LocalReturnData = LocalOriginalData[inItemName];
        };


        return await LocalReturnData;
    };
};

module.exports = {
    FromItemName
};