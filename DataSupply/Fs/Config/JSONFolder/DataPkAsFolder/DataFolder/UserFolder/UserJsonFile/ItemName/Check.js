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

    LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KTFFromRoot = false;

        return LocalReturnData;
    };

    if (inItemName in LocalReturnData.JsonData === false) {
        LocalReturnData.KReason = `Item Name : ${inItemName} not found in ${LocalinFolderName}>${LocalinFileNameOnly}.json`;

        return LocalReturnData;
    };

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
