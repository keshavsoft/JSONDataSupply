let CommonMock = require("../../../../../../../../../MockAllow.json");
let CommonDataFolder = require("../../../../../DataFolder/UserFolder/UserJsonFile/ItemName/PullData/FromFolderFileItemName");
let path = require("path");

let StartFunc = ({ inDataPK, inVouchersConsider }) => {
    let LocalVouchersConsider = inVouchersConsider;

    let LocaData = LocalVouchersConsider.map(element => {
        let LoopInsideObject = CommonDataFolder.StartFunc({
            inFolderName: element.FolderName,
            inFileNameOnly: path.parse(element.FileName).name,
            inItemName: element.ItemName,
            inDataPK
        });

        return { ReportConfig: element, ...LoopInsideObject };
    });

    return LocaData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === '') {
        let LocalFrom = StartFunc({
            inDataPK: CommonMock.DataPK,
            inReportKey: "BankWithdrawals"
        });
        console.log("LocalFrom : ", LocalFrom);
    };
};

module.exports = { StartFunc };
