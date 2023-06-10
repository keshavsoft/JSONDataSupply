let fs = require("fs");
let CommonFromCheck = require("../Check");

let MockAllowFunc = require("../../../../../../MockAllow.json")


let ForExistence = ({ DataPK }) => {
    let LocalinDataPK = DataPK;
    let LocalFileName = "Preload";

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inDataPK: LocalinDataPK
    });

    let LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    LocalReturnData.DirPath = LocalFromCommonFromCheck.DirPath;
    LocalReturnData.PreloadJsonPath = `${LocalFromCommonFromCheck.DirPath}/${LocalFileName}.json`;

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    try {
        if (fs.statSync(LocalReturnData.PreloadJsonPath)) {
            LocalReturnData.KTF = true;
        } else {
            // LocalReturnData.KReason = "File not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = "File not found!";
    };

    return LocalReturnData;
};

if (MockAllowFunc.AllowMock) {
    if (MockAllowFunc.MockKey === "S2") {
        let result = ForExistence({ DataPK: MockAllowFunc.DataPK });
        console.log("result : ", result);
    };
};

module.exports = { ForExistence };
