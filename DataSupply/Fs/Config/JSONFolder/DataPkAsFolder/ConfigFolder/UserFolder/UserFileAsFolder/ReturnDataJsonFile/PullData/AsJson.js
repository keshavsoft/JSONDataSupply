let CommonCheck = require("../Check");
let fs = require("fs");

let StartFunc = async ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFolderName = inFolderName;
        let LocalFileNameOnly = inFileNameOnly;
        let LocalFilePath;

        LocalDataFromCommonCreate = CommonCheck.ForExistence({
            inFolderName: LocalFolderName,
            inFileNameOnly: LocalFileNameOnly,
            inDataPK: LocalDataPK
        });

        LocalReturnObject = { ...LocalDataFromCommonCreate };

        if (LocalDataFromCommonCreate.KTF === false) {
            LocalReturnObject.KReason = LocalDataFromCommonCreate.KReason;
            return await LocalReturnObject;
        };

        LocalFilePath = LocalDataFromCommonCreate.ReturnDataJsonPath;

        LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
        LocalReturnObject.JsonData = JSON.parse(LocalDataFromJSON);

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};
let mockFunck = async () => {
    let localData = await StartFunc({
        inFolderName: "Transactions",
        inFileNameOnly: "GST-SALES",
        inDataPK: 1022
    })
    console.log("localData:",localData);

};
// mockFunck()

module.exports = {
    StartFunc
};