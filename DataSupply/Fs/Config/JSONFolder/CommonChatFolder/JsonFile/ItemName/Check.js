let CommonFromFolderAndFile = require("../PullDataFromFile/FromFolderAndFile");

let StartFunc = ({ inFileNameOnly, inItemName }) => {
    let LocalinFileNameOnly = inFileNameOnly;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromFolderAndFile.StartFunc({ inFileNameOnly: LocalinFileNameOnly });

    LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KTFFromRoot = false;

        return LocalReturnData;
    };

    if (inItemName in LocalReturnData.JsonData === false) {
        LocalReturnData.KReason = `Item Name : not found in >${LocalinFileNameOnly}.json`;

        return LocalReturnData;
    };

    if (inItemName in LocalReturnData.JsonData) {
        LocalReturnData.JsonDataFromItem = LocalReturnData.JsonData[inItemName];

        LocalReturnData.KTF = true;
    };

    return LocalReturnData;
};

module.exports = {
    StartFunc
};
