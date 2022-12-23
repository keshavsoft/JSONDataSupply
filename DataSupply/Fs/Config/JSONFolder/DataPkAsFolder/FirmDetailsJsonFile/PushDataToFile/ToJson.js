let CommonPullDataFromFile = require("../PullDataFromFile/FromJson");
let path = require("path");
let fs = require("fs");

let LocalCheckBeforeInsert = ({ inOriginalData, inDataToUpdate }) => {
    let LocalReturnObject = { KTF: true };
    console.log("ssssssssss : ", JSON.stringify(inDataToUpdate).length, JSON.stringify(inOriginalData).length);
    //debug("inserted length : ", JSON.stringify(inDataToUpdate).length, inOriginalData.length, JSON.stringify(inDataToUpdate).length - inOriginalData.length);

    //debug("inserted length : ", JSON.stringify(inDataToUpdate).length, JSON.stringify(inOriginalData).length, JSON.stringify(inDataToUpdate).length - inOriginalData.length, Math.abs(JSON.stringify(inDataToUpdate).length - inOriginalData.length));

    return LocalReturnObject;
};

let StartFunc = async ({ inFirmName,
    FromDate,
    ToDate,
    AssYear,
    FinYear,
    PAN,
    GST,
    inDataPK }) => {

    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };
    console.log("LocalDataPK --------: ", LocalDataPK);


    if (LocalDataPK > 0) {
        let LocalDataFromCommonCreate;

        LocalDataFromCommonCreate = CommonPullDataFromFile.StartFunc({
            inDataPK: LocalDataPK
        });
        console.log("11111111111LocalDataFromCommonCreate --------: ", LocalDataFromCommonCreate);

        if (LocalDataFromCommonCreate.KTF === false) {
            LocalReturnObject.KReason = LocalDataFromCommonCreate.KReason;
            return await LocalReturnObject;
        };

        if (("JsonData" in LocalDataFromCommonCreate) === false) {
            LocalReturnObject.KReason = "JsonData not found!";
            return await LocalReturnObject;
        };

        if (("Firm" in LocalDataFromCommonCreate.JsonData) === false) {
            LocalReturnObject.KReason = "Firm not found!";
            return await LocalReturnObject;
        };

        LocalDataFromCommonCreate.JsonData.Firm.FirmName = inFirmName;
        //console.log("aaaaaaaa : ", LocalDataFromCommonCreate.JsonData);
        // LocalCheckBeforeInsert({ inOriginalData, inDataToUpdate });

        try {
            fs.writeFileSync(LocalDataFromCommonCreate.FirmDetailsPath, JSON.stringify(LocalDataFromCommonCreate.JsonData));
        } catch (error) {
            console.log("ssssss : ", error);
        };

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let LocalMockFroStartFunc = async () => {
    let result = await StartFunc({
        inDataPK: 16,
        inFirmName: "Keshav"
    });
    console.log("result : ", result);
};
LocalMockFroStartFunc().then();

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