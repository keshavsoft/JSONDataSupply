// let CommonFromCheck = require("../../../Check");
let CommonFromFolderFileItemName = require("../../FromFolderFileItemName");
let _ = require("lodash");
let CommonMock = require("../../../../../../../../../../../MockAllow.json");

let StartFunc = ({ FolderName, FileNameOnly, ItemName, DataPk, FilterString }) => {
    let LocalinFolderName = FolderName;
    let LocalinFileNameOnly = FileNameOnly;
    let LocalinItemName = ItemName;
    let localinFilterString = FilterString;

    let LocalinDataPK = DataPk;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromFolderFileItemName.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };
    // value.CustomerData.CustomerName === "Keshav"
    // LocalReturnData.JsonData = Object.keys(Object.fromEntries(Object.entries(LocalFromCommonFromCheck.JsonData).filter(([key, value]) =>{
    //     console.log(eval(localinFilterString));

    // } ))).length

//    LocalReturnData.JsonData = Object.keys(Object.fromEntries(Object.entries(LocalFromCommonFromCheck.JsonData).filter(([key, value]) => eval(localinFilterString)))).length


    LocalReturnData.JsonData = Object.fromEntries(Object.entries(LocalFromCommonFromCheck.JsonData).filter(([key, value]) => eval(localinFilterString)));

    // LocalReturnData.JsonData[LocalMaxPk] = LocalFromCommonFromCheck.JsonData[LocalMaxPk]
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'SREE5') {
        let LocalMockData = require('./FilterFromInputs.json');

        let LocalData = StartFunc({
            DataPk: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log("LocalData:", LocalData);
    };
};

module.exports = { StartFunc };