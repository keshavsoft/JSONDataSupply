let fs = require("fs");
let CommonFromCheck = require("../CheckPreLoadJsonFile");

let MockAllowFunc = require("../../../../../../../MockAllow.json");

let ForExistence = ({ DataPK }) => {
    let LocalinDataPK = DataPK;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        DataPK: LocalinDataPK
    });

    let LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF) {
        LocalReturnData = "File already present!";
        return LocalReturnData;
    };

    try {
        fs.writeFileSync(LocalReturnData.PreloadJsonPath, JSON.stringify({}));
        LocalReturnData.KTF = true;
        LocalReturnData.PreloadJsonCreated = true;
    } catch (error) {
        LocalReturnData.KReason = "File not found!";
    };

    return LocalReturnData;
};

if (MockAllowFunc.AllowMock) {
    if (MockAllowFunc.MockKey === "K11") {
        let result = ForExistence({ DataPK: MockAllowFunc.DataPK });
        console.log("result : ", result);
    };
};

module.exports = { ForExistence };
