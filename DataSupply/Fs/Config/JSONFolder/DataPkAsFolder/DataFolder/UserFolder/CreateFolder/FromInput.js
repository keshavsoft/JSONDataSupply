let CommonFromCheck = require("../Check");
let fs = require("fs");

let StartFunc = ({ inFolderName, inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalFolderName = inFolderName;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inDataPK: LocalinDataPK,
        inFolderName: LocalFolderName
    });

    LocalReturnData.DirPath = LocalFromCommonFromCheck.DirPath;
    LocalReturnData.FolderPath = LocalFromCommonFromCheck.FolderPath;
    LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;

    if (LocalFromCommonFromCheck.KTF) {
        LocalReturnData.AlreadrPresent = true;
    };

    if (LocalFromCommonFromCheck.DataPkAsFolderPresent === true & LocalFromCommonFromCheck.KTF === false) {
        try {
            fs.mkdirSync(LocalReturnData.FolderPath, {
                recursive: true
            });

            LocalReturnData.KTF = true;
        } catch (error) {
            LocalReturnData.KReason = error;
        };
    };

    return LocalReturnData;
};

let LocalMockFuncForStartFunc = () => {
    let LocalFromStartFunc = StartFunc({ inFolderName: "Trans", inDataPK: 601 });
    console.log("LocalFromStartFunc : ", LocalFromStartFunc);
};

// console.log("ForExistence : ", ForExistence({
//     inFolderName: "Masters",
//     inDataPK: 16
// }));

//LocalMockFuncForStartFunc();

module.exports = { StartFunc };
