let CommonCheck = require("../../../Check/ForPrintFilesJson");

let path = require("path");
let fs = require("fs");

let FromFoldFile = async ({ inFolderName, inFileNameWithExtension, inDataPK }) => {
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

        LocalDataFromCommonCreate = await CommonCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalFileNameWithExtension).name,
            inUserPK: LocalDataPK
        });
        // console.log("ssssssssss : ", LocalDataFromCommonCreate);
        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.PrintFilesJsonPath
            LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
            LocalReturnObject.JsonData = JSON.parse(LocalDataFromJSON);

            LocalReturnObject.KTF = true;
        };
    };

    return await LocalReturnObject;
};

let MockFuncFromFolderFile = async () => {
    return await FromFoldFile({
        inFolderName: "Transactions",
        inFileNameWithExtension: "General Payments.json",
        inDataPK: 1018
    });
};

//MockFuncFromFolderFile().then(p => { console.log("p:", p) })

module.exports = {
    FromFoldFile
};