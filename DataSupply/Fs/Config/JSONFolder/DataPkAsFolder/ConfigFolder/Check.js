let fs = require("fs");
let CommonCheck = require("../Check");

let LocalForExistence = ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromCommonCheck = CommonCheck.ForExistence({ inDataPK });

    if (LocalFromCommonCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonCheck.KReason;
    };

    LocalReturnData.JSONFolderPath = LocalFromCommonCheck.JSONFolderPath;
    LocalReturnData.DataPKPath = LocalFromCommonCheck.DataPKPath;
    LocalReturnData.ConfigPath = `${LocalFromCommonCheck.DataPKPath}/Config`;

    try {
        if (fs.statSync(LocalReturnData.ConfigPath).isDirectory()) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {

    };

    return LocalReturnData;
};


let LocalReturnFolders = ({ inDataPath }) => {
    return fs.readdirSync(inDataPath).filter(function (file) {
        return fs.statSync(inDataPath + '/' + file).isDirectory();
    });
};


// let LocalReturnFolders = ({ inDataPK }) => {
//     let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

//     let LocalFromCommonCheck = LocalForExistence({ inDataPK });

//     if (LocalFromCommonCheck.KTF) {
//         LocalReturnData.KReason = LocalFromCommonCheck.KReason;
//         return LocalReturnData;
//     };

//     LocalReturnData.KTF = true;

//     // if (fs.existsSync(LocalPath)) {
//     //     return fs.readdirSync(LocalPath).filter(function (file) {
//     //         return fs.statSync(LocalPath + '/' + file).isDirectory();
//     //     });
//     // };

//     let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

//     let LocalFromCommonCheck = CommonCheck.ForExistence({ inDataPK });

//     if (LocalFromCommonCheck.KTF === false) {
//         LocalReturnData.KReason = LocalFromCommonCheck.KReason;
//     };

//     LocalReturnData.JSONFolderPath = LocalFromCommonCheck.JSONFolderPath;
//     LocalReturnData.DataPKPath = LocalFromCommonCheck.DataPKPath;
//     LocalReturnData.ConfigPath = `${LocalFromCommonCheck.DataPKPath}/Config`;

//     try {
//         if (fs.statSync(LocalReturnData.ConfigPath).isDirectory()) {
//             LocalReturnData.KTF = true;
//         };
//     } catch (error) {

//     };

//     return LocalReturnData;
// };


let FolderIsEmpty = ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromCommonCheck = LocalForExistence({ inDataPK });

    if (LocalFromCommonCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonCheck.KReason;
    };

    LocalReturnData.ConfigPath = `${LocalFromCommonCheck.DataPKPath}/Config`;

    let LocalFoldersArray = LocalReturnFolders({ inDataPath: LocalReturnData.ConfigPath });

    if (LocalFoldersArray.length === 0) {
        LocalReturnData.KTF = true;

        return LocalReturnData;
    };

    return LocalReturnData;
};

// let LocalMockForExistence = FolderIsEmpty({ inDataPK: 16 });
// console.log("LocalMockForExistence : ", LocalMockForExistence);

module.exports = { FolderIsEmpty };
