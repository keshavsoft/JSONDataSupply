let _ = require("lodash");
let Path = require("path");

let CommonPullDataFromConfig = require("../../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../../PushData/FromFoldFile");
let CommonPullData = require("../../../../../PullDataFromFile/FromFolderAndFile");
let CommonAllowMock = require("../../../../../../../../../../../../../KSConfig.json");

let Update = async ({ DataPK, folderName, FileName, ItemName, ScreenName, subtablecolumnkey, DataAttribute, BodyAsJson }) => {
    const LocalDataToUpdate = (({ Max, Min, Step, HTMLControlType }) => ({ Max, Min, Step, HTMLControlType }))(BodyAsJson);
    let LocalinDataPK = DataPK;
    let LocalReturnObject = { KTF: false };

    if (LocalinDataPK > 0 === false) {
        LocalReturnObject.KReason = 'DataPK not found in JSON folder';
        return LocalReturnObject;
    };

    // let inJsonConfig = { inFolderName: folderName, inJsonFileName: FileName }
    let LocalItemName = ItemName;
    let LocalScreenName = ScreenName;
    let LocalFindColumnObject;
    let LocalFromUpdate;

    let Localsubtablecolumnkey = subtablecolumnkey;
    let LocalFileNameOnly = Path.parse(FileName).name

    // let LocalFromPullData = await CommonPullDataFromConfig.FromJsonConfig({
    //     inJsonConfig,
    //     inDataPK: LocalinDataPK
    // });

    let LocalFromPullData = await CommonPullData.StartFunc({
        inFolderName: folderName,
        inFileNameOnly: LocalFileNameOnly,
        inDataPK: LocalinDataPK
    });

    LocalReturnObject = { ...LocalFromPullData };

    if (LocalReturnObject.KTF === false) {
        return LocalReturnObject;
    };

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromPullData.JsonData));

    if (LocalItemName in LocalNewData) {
        if (LocalScreenName in LocalNewData[LocalItemName]) {
            if ("SubTableColumns" in LocalNewData[LocalItemName][LocalScreenName]) {
                if (Localsubtablecolumnkey in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns) {
                    if ("TableColumns" in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[Localsubtablecolumnkey]) {

                        LocalFindColumnObject = _.find(LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[Localsubtablecolumnkey].TableColumns, { DataAttribute });

                        LocalFindColumnObject.KDataset.HTMLControlType = LocalDataToUpdate.HTMLControlType;
                        LocalFindColumnObject.KDataset.Step = LocalDataToUpdate.Step;
                        LocalFindColumnObject.KDataset.Min = LocalDataToUpdate.Min;
                        LocalFindColumnObject.KDataset.Max = LocalDataToUpdate.Max;

                        LocalFromUpdate = await CommonFromPushData.StartFunc({
                            inFolderName: folderName,
                            inFileNameWithExtension: FileName,
                            inDataPK: LocalinDataPK,
                            inDataToUpdate: LocalNewData,
                            inOriginalData: LocalFromPullData.JsonData
                        });


                        if (LocalFromUpdate.KTF) {
                            LocalReturnObject.KTF = true;
                        };

                        return await LocalReturnObject;
                    };
                };
            };

        };
    };

    return await LocalReturnObject;
};

// UpdateKeys({
//     DataPK: 16, folderName: "Masters", FileName: "Customers.json", ItemName: "CustomersName", ScreenName: "Create",
//     DataAttribute: "pk",
//     BodyAsJson: {
//         DisplayName: "ppppppppppp"
//     }
// }).then(p => {
//     console.log("pppp : ", p);
// });

const LocalFuncUpdateMock = () => {
    let MockJson = require("./UpdateMock.json");

    Update(MockJson).then(PromiseData => {
        console.log("PromiseData : ", PromiseData);
    });
};

if (CommonAllowMock.AllowMockFuncRun) {
    LocalFuncUpdateMock();    
};

module.exports = {
    Update
};