// let CommonFromCheck = require("../../../Check");
let CommonFromFolderFileItemName = require("../../FromFolderFileItemName");
let _ = require("lodash");
let CommonMock = require("../../../../../../../../../../../MockAllow.json");

let StartFunc = ({ FolderName, FileNameOnly, ItemName, DataPk, MapString, FilterString }) => {
    let LocalinFolderName = FolderName;
    let LocalinFileNameOnly = FileNameOnly;
    let LocalinItemName = ItemName;
    let localinMapString = MapString;
    let LocalinFilterString = FilterString;

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

    let LocalFilteredData = Object.entries(LocalFromCommonFromCheck.JsonData).filter(([key, value]) => eval(LocalinFilterString));
    
    LocalReturnData.JsonData = LocalFilteredData.map(p => eval(`p[1].${localinMapString}`)).reduce((map, item) => {
        if (!map[item]) {
            map[item] = 1;
        } else {
            map[item]++;
        }
        return map;
    }, {})

    // Local = Object.values(LocalFromCommonFromCheck.JsonData).map(p => eval(`p.${localinMapString}`))

    // LocalReturnData.JsonData = Object.keys(Object.fromEntries(Object.entries(LocalFromCommonFromCheck.JsonData).filter(([key, value]) => eval(localinFilterString)))).length


    // LocalReturnData.JsonData[LocalMaxPk] = LocalFromCommonFromCheck.JsonData[LocalMaxPk]
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K6') {
        let LocalMockData = require('./FilterAndGroupBy.json');

        let LocalData = StartFunc({
            DataPk: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log("LocalData:", LocalData);
    };
};

module.exports = { StartFunc };