let fs = require("fs");
let CommonFromCheck = require("../CheckPreLoadJsonFile");

let MockAllowFunc = require("../../../../../../../MockAllow.json")

let StartFunc = ({ DataPK }) => {
    let LocalinDataPK = DataPK;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        DataPK: LocalinDataPK
    });

    let LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };

    try {
        let rawdata = fs.readFileSync(LocalReturnData.PreloadJsonPath);
        LocalReturnData.JsonData = JSON.parse(rawdata);
        LocalReturnData.KTF = true;
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

if (MockAllowFunc.AllowMock) {
    if (MockAllowFunc.MockKey === "S4") {
        let result = StartFunc({ DataPK: MockAllowFunc.DataPK });
        console.log("result : ", result);
    };
};


module.exports = { StartFunc };
