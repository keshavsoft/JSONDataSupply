let CommonPullDataFromFile = require("../PullDataFromFile/FromJson");
let CommonMock = require("../../../../../../../MockAllow.json");

// try {
//     let rawdata = fs.readFileSync(LocalReturnData.PreloadJsonPath);
//     LocalReturnData.JsonData = JSON.parse(rawdata);
//     LocalReturnData.KTF = true;
// } catch (error) {
//     LocalReturnData.KReason = error;
// };


let StartFunc = ({ inDataPK, inReportKey }) => {
    let LocalKeyName = inReportKey;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let CommonFromFolderCheck = CommonPullDataFromFile.StartFuncNoSync({ inDataPK });

    LocalReturnData = { ...CommonFromFolderCheck };
    LocalReturnData.KTF = false;

    if (CommonFromFolderCheck.KTF === false) {
        return LocalReturnData;
    };

    if (LocalKeyName in LocalReturnData.JsonData === false) {
        LocalReturnData.KReason = "Key not found...";
        return LocalReturnData;
    };

    LocalReturnData.KTF = true;

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'KR23') {
        let LocalFrom = StartFunc({
            inDataPK: CommonMock.DataPK,
            inReportKey: "BankWithdrawals"
        });
        console.log("LocalFrom : ", LocalFrom);
    };
};

module.exports = { StartFunc };
