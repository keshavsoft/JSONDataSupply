let fs = require("fs");
let CommonFromCheck = require("../../Check");

let MockAllowFunc = require("../../../../../../../MockAllow.json")

let StartFunc = ({ DataPK }) => {
    let LocalinDataPK = DataPK;
    let LocalReturnData;
    let LocalFileName = "Preload";

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    LocalReturnData.FolderdPath = `${LocalFromCommonFromCheck.DirPath}/${LocalFileName}.json`;

    console.log("LocalReturnData", LocalReturnData);


    try {
        let rawdata = fs.readFileSync(LocalReturnData.FolderdPath);
        LocalReturnData.JsonData = JSON.parse(rawdata);
        LocalReturnData.KTF = true;
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

if (MockAllowFunc.AllowMock) {
    if (MockAllowFunc.MockKey === "S1") {
        let result = StartFunc({ DataPK: MockAllowFunc.DataPK });
        console.log("result : ", result);
    };
};


module.exports = { StartFunc };
