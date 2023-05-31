let fs = require("fs");
let CommonFromCheck = require("./Check");

let StartFunc = ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalFileName = "ReturnData.json";

    let LocalinDataPK = inDataPK;
    //  let LocalReturnData = { KTkF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK
    });

    let LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF) {
        return LocalReturnData;
    };

    try {
        if (fs.writeFileSync(LocalReturnData.ReturnDataJsonPath, JSON.stringify({}))) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "File not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

// console.log("ForExistence : ", ForExistence({
//     inFolderName: "Masters",
//     inFileNameOnly: "Products",
//     inDataPK: 1022
// }));

module.exports = { StartFunc };
