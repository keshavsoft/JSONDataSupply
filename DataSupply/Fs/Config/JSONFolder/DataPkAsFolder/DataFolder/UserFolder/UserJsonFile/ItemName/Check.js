let CommonFromFolderAndFile = require("../PullDataFromFile/FromFolderAndFile");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromFolderAndFile.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    LocalReturnData.JsonData = LocalFromCommonFromCheck.JsonData;

    if (inItemName in LocalReturnData.JsonData) {
        LocalReturnData.KTF = true;
    };

    return LocalReturnData;
};

// console.log("ForExistence : ", StartFunc({
//     inFolderName: "Masters",
//     inFileNameOnly: "Customers",
//     inItemName: "CustomerNames",
//     inDataPK: 16
// }));

module.exports = {
    StartFunc
};
