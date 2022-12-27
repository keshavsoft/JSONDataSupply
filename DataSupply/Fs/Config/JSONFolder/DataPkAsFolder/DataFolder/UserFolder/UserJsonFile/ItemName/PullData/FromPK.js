let CommonFromCheck = require("./FromFolderFileItemName");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inDataPK, inJsonPk }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    if ((inJsonPk in LocalFromCommonFromCheck.JsonData) === false) {
        LocalReturnData.KReason = `RowPK : ${inJsonPk} is not found in data!`;
        return LocalReturnData;
    };

    LocalReturnData.JsonData = LocalFromCommonFromCheck.JsonData[inJsonPk];
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

module.exports = { StartFunc };
