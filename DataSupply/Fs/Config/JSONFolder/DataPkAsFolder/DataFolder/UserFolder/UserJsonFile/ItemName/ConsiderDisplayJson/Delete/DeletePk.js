let CommonCheck = require("../../Check");
let CommonFromPushDataToFile = require("../../../PushDataToFile/FolderAndFile");
let CommonMock = require("../../../../../../../../../../MockAllow.json");
let CheckConfigColumns = require("../../../../../../ConfigFolder/getDirectoriesWithConfigColumns")

let StartFunc = async ({ inFolderName, inFileNameOnly, inItemName, inDataPK, inJsonPk }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonCheck.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    if ((inJsonPk in LocalFromCommonFromCheck.JsonData[LocalinItemName]) === false) {
        LocalReturnData.KReason = `RowPK : ${inJsonPk} is not found in data!`;
        return LocalReturnData;
    };

    let localConfigColumns = await CheckConfigColumns.ServerSideAsArray({ inDataPK: LocalinDataPK });

    let lcoalFilterData = localConfigColumns.filter((element) =>
        element.FolderName === LocalinFolderName &&
        element.FileName === inFileNameOnly &&
        element.ItemName === inItemName &&
        element.CheckColumnName === 'pk'
    );
    console.log("lcoalFilterData::", lcoalFilterData);



    // delete LocalFromCommonFromCheck.JsonData[LocalinItemName][inJsonPk];

    // let LocalFromPush = await CommonFromPushDataToFile.InsertToJson({
    //     inFolderName: LocalinFolderName,
    //     inFileNameOnly: LocalinFileNameOnly,
    //     inDataPK: LocalinDataPK,
    //     inDataToUpdate: LocalFromCommonFromCheck.JsonData,
    //     inOriginalData: ""
    // });

    // if (LocalFromPush.KTF === true) {
    //     LocalReturnData.KTF = true;
    // };

    return await LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'KVS') {
        let LocalMockData = require('./DeletePk.json');

        StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};


module.exports = { StartFunc };
