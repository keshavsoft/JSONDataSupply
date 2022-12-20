let CommonCheck = require("../Check");
let path = require("path");
let fs = require("fs");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalFilePath;

        LocalDataFromCommonCreate = CommonCheck.ForExistence({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalFileNameWithExtension).name,
            inDataPK: LocalDataPK
        });

        if (LocalDataFromCommonCreate.KTF === false) {
            LocalReturnObject.KReason = LocalDataFromCommonCreate.KReason;
            return await LocalReturnObject;
        };

        LocalFilePath = LocalDataFromCommonCreate.PrintFilesPath
        LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
        LocalReturnObject.JsonData = JSON.parse(LocalDataFromJSON);

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let MockFuncFromFolderFile = async () => {
    return await StartFunc({
        inFolderName: "Transactions",
        inFileNameWithExtension: "GST-SALES.json",
        inDataPK: 1022
    });
};

// MockFuncFromFolderFile().then(p => {
//     console.log("aaaaaaaa : ", p);
// });

// FromJsonConfig({
//     inJsonConfig:{
//         inFolderName: "Masters",
//         inJsonFileName: "Customers.json"
//     },
//     inDataPK: 16
// }).then(p => {
//     console.log("pppp : ", p);
// });

module.exports = {
    StartFunc
};