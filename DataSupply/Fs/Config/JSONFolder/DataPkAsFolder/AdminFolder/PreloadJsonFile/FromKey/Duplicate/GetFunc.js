let CommonPullDataFromFile = require("../../PullDataFromFile/FromJson");
let CommonCheckKey = require("../PullData/FromKeys");

let MockAllowFunc = require("../../../../../../../../MockAllow.json")

let StartFunc = ({ DataPK }) => {
    let LocalinDataPK = DataPK;
    let LocalReturnData = {};

    let LocalFromCommonCheckKey = CommonPullDataFromFile.StartFunc({
        DataPK: LocalinDataPK
    });

    LocalReturnData = { ...LocalFromCommonCheckKey };

    if (LocalFromCommonCheckKey.KTF === false) {
        return LocalReturnData;
    };

    return LocalReturnData;
};

if (MockAllowFunc.AllowMock) {
    if (MockAllowFunc.MockKey === "K13") {
        let result = StartFunc({
            DataPK: MockAllowFunc.DataPK
        });
        console.log("result : ", result);
    };
};

module.exports = { StartFunc };
