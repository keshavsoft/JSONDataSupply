let CommonFromFromFolderFileItemName = require("../../PullData/FromFolderFileItemName");
let _ = require("lodash");
let CommonMockAllow = require("../../../../../../../../../../MockAllow.json");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inColumnName, inValueToCheck, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    if (inColumnName === undefined) {
        LocalReturnData.KReason = "Need to send ColumnName";
        return LocalReturnData;
    };

    if (inValueToCheck === undefined) {
        LocalReturnData.KReason = "Need to send ValueToCheck";
        return LocalReturnData;
    };

    let LocalFromCommonFromFromFolderFileItemName = CommonFromFromFolderFileItemName.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromFromFolderFileItemName.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromFromFolderFileItemName.KReason;
        return LocalReturnData;
    };

    let LocalTotalArray = LocalFromCommonFromFromFolderFileItemName.JsonData[inColumnName].filter(LoopItem => {
        return eval(inValueToCheck)
    });
    LocalReturnData.JsonData = LocalTotalArray;
    // LocalReturnData.JsonData = LocalTotalArray.filter(element => {
    //     return element[inColumnName] === inValueToCheck;
    // });

    // console.log("LocalTotalArray : ", LocalTotalArray);

    // LocalReturnData.JsonData = LocalFromCommonFromCheck.JsonData[LocalinItemName];
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "hell") {
        let LocalMockData = require("./IsEqualMock.json");

        let LocalFromStartFunc = StartFunc({
            ...LocalMockData,
            inDataPK: CommonMockAllow.DataPK
        });

        console.log("LocalFromStartFunc : ", LocalFromStartFunc);
    };
};

module.exports = { StartFunc };
