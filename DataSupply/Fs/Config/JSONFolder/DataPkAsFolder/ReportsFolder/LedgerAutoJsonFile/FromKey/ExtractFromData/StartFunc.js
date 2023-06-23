let CommonCheckKey = require("../CheckKey");
let CommonMock = require("../../../../../../../../MockAllow.json");
let CommonFromVouchersConsider = require("./FromVouchersConsider/StartFunc");
let CommonFromNeededColumns = require("./FromVouchersConsider/NeededColumns");

let StartFunc = ({ inDataPK, inReportKey }) => {
    let LocalKeyName = inReportKey;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let CommonFromFolderCheck = CommonCheckKey.StartFunc({ inDataPK, inReportKey: LocalKeyName });

    LocalReturnData = { ...CommonFromFolderCheck };
    LocalReturnData.KTF = false;

    if (CommonFromFolderCheck.KTF === false) {
        return LocalReturnData;
    };

    LocalReturnData.FromVouchersConsider = CommonFromVouchersConsider.StartFunc({
        inDataPK,
        inVouchersConsider: LocalReturnData.JsonData[inReportKey].VouchersConsider
    });

    LocalReturnData.FromNeededColumns = CommonFromNeededColumns.StartFunc({
        inDataArray: LocalReturnData.FromVouchersConsider
    });

    LocalReturnData.KTF = true;
    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'KR24') {
        let LocalFrom = StartFunc({
            inDataPK: CommonMock.DataPK,
            inReportKey: "Purchases"
        });
        console.log("-----------aaaaaa : ", LocalFrom.FromNeededColumns[0]);
    };
};

module.exports = { StartFunc };
