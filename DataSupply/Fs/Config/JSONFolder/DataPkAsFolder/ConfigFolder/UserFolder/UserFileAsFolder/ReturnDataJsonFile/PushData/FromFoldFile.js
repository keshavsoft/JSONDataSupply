let CommonCheck = require("../Check");
let path = require("path");
let fs = require("fs");

let LocalCheckBeforeInsert = ({ inOriginalData, inDataToUpdate }) => {
    let LocalReturnObject = { KTF: true };
    console.log("ssssssssss : ", JSON.stringify(inDataToUpdate).length, JSON.stringify(inOriginalData).length);

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
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;

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
            fs.writeFileSync(LocalDataFromCommonCreate.ReturnDataJsonPath, JSON.stringify(inDataToUpdate));
        } catch (error) {
            console.log("ssssss : ", error);
        };

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

// StartFunc({
// inFolderName: "Transactions",
// inFileNameOnly: "GST-SALES",
// inDataPK: 1022,
//     inUpdatedData: {}
// }).then(p => {
//     console.log("pppp : ", p);
// });



module.exports = {
    StartFunc
};