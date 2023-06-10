let fs = require("fs");
let CommonCheckPreLoadJsonFile = require("../CheckPreLoadJsonFile");
let MockAllowFunc = require("../../../../../../../MockAllow.json");


let LocalCheckBeforeInsert = ({ inOriginalData, inDataToUpdate }) => {
    let LocalReturnObject = { KTF: true };
    console.log("ssssssssss : ", JSON.stringify(inDataToUpdate).length, JSON.stringify(inOriginalData).length);

    return LocalReturnObject;
};

let StartFunc = ({ DataPK, inOriginalData, inDataToUpdate }) => {
    let LocalDataPK = DataPK;
    let LocalReturnData;

    if (LocalDataPK > 0) {

        let LocalDataFromCommonCreate = CommonCheckPreLoadJsonFile.ForExistence({
            DataPK: LocalDataPK
        });

        if (LocalDataFromCommonCreate.KTF === false) {
            LocalReturnData.KReason = LocalDataFromCommonCreate.KReason;
            return LocalReturnObject;
        };

        LocalReturnData = { ...LocalDataFromCommonCreate };
        LocalReturnData.KTF = false;

        LocalCheckBeforeInsert({ inOriginalData, inDataToUpdate });

        try {
            fs.writeFileSync(LocalReturnData.PreloadJsonPath, JSON.stringify(inDataToUpdate));
            LocalReturnData.KTF = true;

        } catch (error) {
            console.log("ssssss : ", error);
        };

    };

    return LocalReturnData;
};

if (MockAllowFunc.AllowMock) {
    if (MockAllowFunc.MockKey === "") {
        let result = StartFunc({
            DataPK: MockAllowFunc.DataPK,
            inOriginalData: "Masters-Accounts",
            inDataToUpdate: "vvvvvv"

        });
        console.log("result : ", result);
    };
};



module.exports = {
    StartFunc
};