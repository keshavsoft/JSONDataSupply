let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;

    let LocalinDataPK = inDataPK;
    // let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistenceOfUserFolder({
        inFolderName: LocalinFolderName,
        inDataPK: LocalinDataPK
    });
    // console.log("aaaaaaaaaaaaa: ", LocalFromCommonFromCheck);
    let LocalReturnData = { ...LocalFromCommonFromCheck };

    LocalReturnData.KTF = false;
    LocalReturnData.UserJsonFilePath = `${LocalReturnData.FolderPath}/${LocalinFileNameOnly}.json`;

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.UserFolderPresent = false;
        return LocalReturnData;
    };

    try {
        if (fs.existsSync(LocalReturnData.UserJsonFilePath)) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "Json File name not found in Data Folder";
        }
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

// console.log("ForExistence : ", ForExistence({
//     inFolderName: "Masters",
//     inFileNameOnly: "Customers",
//     inDataPK: 16
// }));

module.exports = { ForExistence };
