let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = ({ inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFileName = "FirmDetails.json";

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    LocalReturnData.DataPKPath = LocalFromCommonFromCheck.DataPKPath;
    LocalReturnData.FirmDetailsPath = `${LocalReturnData.DataPKPath}/${LocalFileName}`;

    try {
        if (fs.statSync(`${LocalReturnData.DataPKPath}/${LocalFileName}`)) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = `${LocalFileName} : File not found!`;
        }
    } catch (error) {
        //LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

// console.log("ForExistence : ", ForExistence({
//     inFolderName: "Masters",
//     inFileNameOnly: "Customers",
//     inDataPK: 16
// }));

module.exports = { ForExistence };
