let CommonCheck = require("../Check");
let path = require("path");
let fs = require("fs");

let LocalCheckBeforeInsert = ({ inOriginalData, inDataToUpdate }) => {
    let LocalReturnObject = { KTF: true };
    console.log("ssssssssss : ", JSON.stringify(inDataToUpdate).length, JSON.stringify(inOriginalData).length);
    //debug("inserted length : ", JSON.stringify(inDataToUpdate).length, inOriginalData.length, JSON.stringify(inDataToUpdate).length - inOriginalData.length);

    //debug("inserted length : ", JSON.stringify(inDataToUpdate).length, JSON.stringify(inOriginalData).length, JSON.stringify(inDataToUpdate).length - inOriginalData.length, Math.abs(JSON.stringify(inDataToUpdate).length - inOriginalData.length));

    return LocalReturnObject;
};

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inOriginalData, inDataToUpdate, inDataPK }) => {
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

        LocalCheckBeforeInsert({ inOriginalData, inDataToUpdate });

        try {
            fs.writeFileSync(LocalDataFromCommonCreate.DisplayJsonPath, JSON.stringify(inDataToUpdate));
        } catch (error) {
            console.log("ssssss : ", error);
        };

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

// StartFunc({
//     inFolderName: "Masters",
//     inFileNameWithExtension: "Customers.json",
//     inDataPK: 16,
//     inUpdatedData: {}
// }).then(p => {
//     console.log("pppp : ", p);
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