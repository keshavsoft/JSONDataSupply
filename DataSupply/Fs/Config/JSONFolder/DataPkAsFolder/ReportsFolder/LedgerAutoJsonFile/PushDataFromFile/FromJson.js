let CommonCheck = require("../Check");
let path = require("path");
let fs = require("fs");

let LocalCheckBeforeInsert = ({ inOriginalData, inDataToUpdate }) => {
    let LocalReturnObject = { KTF: true };
    console.log("ssssssssss : ", JSON.stringify(inDataToUpdate).length, JSON.stringify(inOriginalData).length);

    return LocalReturnObject;
};

let StartFunc = async ({  inOriginalData, inDataToUpdate, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalDataFromCommonCreate;

        LocalDataFromCommonCreate = CommonCheck.StartFunc({
            inDataPK: LocalDataPK
        });
        //   console.log("11111111111LocalDataFromCommonCreate --------: ", LocalDataFromCommonCreate);

        if (LocalDataFromCommonCreate.KTF === false) {
            LocalReturnObject.KReason = LocalDataFromCommonCreate.KReason;
            return await LocalReturnObject;
        };

        LocalCheckBeforeInsert({ inOriginalData, inDataToUpdate });

        try {
            fs.writeFileSync(LocalDataFromCommonCreate.ReportFilePath, JSON.stringify(inDataToUpdate));
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