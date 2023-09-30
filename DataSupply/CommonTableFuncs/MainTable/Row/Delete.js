    let CommonPullData = require("../../../Fs/Config/Folders/Files/PullData/FromDataFolder/FromFolderAndFile");
let CommonPushData = require("../../../Fs/Config/Folders/Files/PushData/ToDataFolder/FromFolderAndFile");

let CommonDataSupplyReturnDataFuncs = require("../../../Fs/Config/Folders/Files/ConfigFromDisplayJson/CommonFuns/ReturnDataFuncs");

//let CommonDataSupplyReturnDataFuncs = require("../../CommonFuns/ReturnDataFuncs");
let CommonMock = require("../../../MockAllow.json")
exports.FromRowPK = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inJsonPK, inDataPK }) => {
    return await LocalMainTableDelete({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inJsonPK, inDataPK });
};

let LocalMainTableDelete = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inJsonPK, inDataPK }) => {
    let LocalFolderName = inFolderName;
    let LocalFileNameWithExtension = inFileNameWithExtension;
    let LocalItemName = inItemName;
    // let LocalScreenName = inScreenName;
    let LocalJsonPK = inJsonPK;
    let LocalDataPK = inDataPK;
    let LocalUpdatedData;

    let LocallReturnData = { KTF: true };

    if (LocalDataPK > 0) {
        let LocalCommonFromData = await CommonPullData.FullJsonData({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inDataPK: LocalDataPK
        });
        console.log("LocalCommonFromData : ", LocalCommonFromData);
        if (LocalCommonFromData.KTF === false) {
            LocallReturnData.KReason = LocalCommonFromData.KReason;
            return await LocallReturnData;
        };

        if (("KResult" in LocalCommonFromData) === false) {
            LocallReturnData.KReason = "KResult not found!";
            return await LocallReturnData;
        };

        LocalUpdatedData = JSON.parse(JSON.stringify(LocalCommonFromData.KResult));

        if ((LocalItemName in LocalUpdatedData) === false) {
            LocallReturnData.KReason = `${LocalItemName} : ItemName not found!`;
            return await LocallReturnData;
        };

        if ((LocalJsonPK in LocalUpdatedData[LocalItemName]) === false) {
            LocallReturnData.KReason = `${LocalJsonPK} : not found in ${LocalItemName}!`;
            return await LocallReturnData;
        };

        delete LocalUpdatedData[LocalItemName][LocalJsonPK];

        let LocalFromUpdate = await CommonPushData.AsAsync({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inDataPK,
            inDataToUpdate: LocalUpdatedData,
            inOriginalData: LocalCommonFromData.KResult
        });

        if (LocalFromUpdate.KTF === false) {
            LocallReturnData.KReason = LocalFromUpdate.KReason;

            return await LocallReturnData;
        };

        // let LocalFromReturnData = await CommonDataSupplyReturnDataFuncs.TableRowDelete({
        //     inFolderName: LocalFolderName,
        //     inFileNameWithExtension: LocalFileNameWithExtension,
        //     inItemName: LocalItemName,
        //     inScreenName: LocalScreenName,
        //     inJsonPK: LocalJsonPK,
        //     inDataPK: LocalDataPK
        // });

        // if (LocalFromReturnData.KTF === false) {
        //     LocallReturnData.KReason = LocalFromUpdate.KReason;

        //     return await LocallReturnData;
        // };

        // LocallReturnData.DataFromServer = LocalFromReturnData.DataFromServer;

        LocallReturnData.KTF = true;
    };

    
    return await LocallReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K6') {
        let LocalMockData = require('./Delete.json');

        LocalMainTableDelete({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);
           
        });
    };
};



