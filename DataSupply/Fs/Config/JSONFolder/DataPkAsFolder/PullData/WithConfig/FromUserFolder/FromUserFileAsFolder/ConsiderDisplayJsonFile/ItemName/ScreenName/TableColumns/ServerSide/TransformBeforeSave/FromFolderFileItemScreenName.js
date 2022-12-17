let CommonFromCheck = require("../Check");
let _ = require("lodash");
let Common=require("../../../../../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/")
let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inDataPK }) => {
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

    LocalReturnData.JsonData = LocalFromCommonFromCheck.JsonData[LocalinItemName];
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

console.log("ForExistence----- : ", ReturnAsArrayWithPKSortByPK({
    inFolderName: "Transactions",
    inFileNameOnly: "GST-SALES",
    inItemName: "FERTLIZERS-GST--SALES",
    inDataPK: 1024
}).JsonData[0]);

module.exports = { StartFunc };
