let fs = require("fs");
let CommonFromCheck = require("../Check");

let StartFunc = ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    LocalReturnData.UserJsonFilePath = LocalFromCommonFromCheck.DisplayJsonPath;

    try {
        let rawdata = fs.readFileSync(LocalReturnData.UserJsonFilePath);
        LocalReturnData.JsonData = JSON.parse(rawdata);
        LocalReturnData.KTF = true;
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

// console.log("ForExistence : ", StartFunc({
//     inFolderName: "Masters",
//     inFileNameOnly: "Customers",
//     inDataPK: 16
// }));

module.exports = { StartFunc };
