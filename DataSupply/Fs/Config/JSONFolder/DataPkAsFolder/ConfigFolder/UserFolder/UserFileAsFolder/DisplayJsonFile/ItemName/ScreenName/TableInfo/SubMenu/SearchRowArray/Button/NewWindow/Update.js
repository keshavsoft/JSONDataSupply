let CommonPullDataFromConfig = require("../../../../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../../../../PushData/FromFoldFile");
let CommonCheckScreenName = require("../../../../../CheckScreenName");

let CommonMockAllow = require("../../../../../../../../../../../../../../../MockAllow.json");

let Update = async ({ DataPK, FolderName, FileName, ItemName, ScreenName, BodyAsJson }) => {
    const LocalDataToUpdate = (({ KTF, SvgPlus, ColClass, SvgPlusLarge, NewWindow, Table }) => ({ KTF, SvgPlus, ColClass, SvgPlusLarge, NewWindow, Table }))(BodyAsJson);
    let LocalinDataPK = DataPK;

    let LocalItemName = ItemName;
    let LocalScreenName = ScreenName;
    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false };

    let LocalFromCheck = await CommonCheckScreenName.StartFuncNoSync({
        inFolderName: FolderName,
        inFileNameOnly: FileName,
        inItemName: LocalItemName,
        inScreenName: LocalScreenName,
        inDataPK: LocalinDataPK
    });

    LocalReturnObject = { ...LocalFromCheck };
    LocalReturnObject.KTF = false;

    if (LocalFromCheck.KTF === false) {
        LocalReturnObject.KTFFromRoot = false;
        return LocalReturnObject;
    };

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromCheck.JsonData));

    if ("TableInfo" in LocalNewData[LocalItemName][LocalScreenName]) {
        LocalNewData[LocalItemName][LocalScreenName].TableInfo.SearchRowArray.Button.NewWindow.KTF = LocalDataToUpdate.KTF;
        LocalNewData[LocalItemName][LocalScreenName].TableInfo.SearchRowArray.Button.NewWindow.DisplayObject.SvgPlus = LocalDataToUpdate.SvgPlus;
        LocalNewData[LocalItemName][LocalScreenName].TableInfo.SearchRowArray.Button.NewWindow.DisplayObject.ColClass = LocalDataToUpdate.ColClass;
        LocalNewData[LocalItemName][LocalScreenName].TableInfo.SearchRowArray.Button.NewWindow.DisplayObject.NewWindow = LocalDataToUpdate.NewWindow;
        LocalNewData[LocalItemName][LocalScreenName].TableInfo.SearchRowArray.Button.NewWindow.DisplayObject.SvgPlusLarge = LocalDataToUpdate.SvgPlusLarge;
        LocalNewData[LocalItemName][LocalScreenName].TableInfo.SearchRowArray.Button.NewWindow.DisplayObject.Table = LocalDataToUpdate.Table;

        LocalFromUpdate = await CommonFromPushData.StartFunc({
            inFolderName: FolderName,
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

    return await LocalReturnObject;
};

let Update_keshav_15Jun = async ({ DataPK, FolderName, FileName, ItemName, ScreenName, BodyAsJson }) => {
    const LocalDataToUpdate = (({ KTF, SvgPlus, ColClass, SvgPlusLarge, NewWindow, Table }) => ({ KTF, SvgPlus, ColClass, SvgPlusLarge, NewWindow, Table }))(BodyAsJson);
    let LocalinDataPK = DataPK;

    let LocalItemName = ItemName;
    let LocalScreenName = ScreenName;
    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false };

    let LocalFromPullData = await CommonPullDataFromConfig.FromFoldFile({
        inFolderName: FolderName,
        inFileNameWithExtension: `${FileName}.json`,
        inDataPK: LocalinDataPK
    });

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromPullData.JsonData));

    if (LocalItemName in LocalNewData) {
        if (LocalScreenName in LocalNewData[LocalItemName]) {
            if ("TableInfo" in LocalNewData[LocalItemName][LocalScreenName]) {
                LocalNewData[LocalItemName][LocalScreenName].TableInfo.SearchRowArray.Button.NewWindow.KTF = LocalDataToUpdate.KTF;
                LocalNewData[LocalItemName][LocalScreenName].TableInfo.SearchRowArray.Button.NewWindow.DisplayObject.SvgPlus = LocalDataToUpdate.SvgPlus;
                LocalNewData[LocalItemName][LocalScreenName].TableInfo.SearchRowArray.Button.NewWindow.DisplayObject.ColClass = LocalDataToUpdate.ColClass;
                LocalNewData[LocalItemName][LocalScreenName].TableInfo.SearchRowArray.Button.NewWindow.DisplayObject.NewWindow = LocalDataToUpdate.NewWindow;
                LocalNewData[LocalItemName][LocalScreenName].TableInfo.SearchRowArray.Button.NewWindow.DisplayObject.SvgPlusLarge = LocalDataToUpdate.SvgPlusLarge;
                LocalNewData[LocalItemName][LocalScreenName].TableInfo.SearchRowArray.Button.NewWindow.DisplayObject.Table = LocalDataToUpdate.Table;

                LocalFromUpdate = await CommonFromPushData.StartFunc({
                    inFolderName: FolderName,
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

    return await LocalReturnObject;
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "Jatin15") {
        let LocalMockData = require("./Update.json");

        Update({
            ...LocalMockData,
            DataPK: CommonMockAllow.DataPK
        }).then(PromiseData => {
            console.log("PromiseData", PromiseData);
        });
    };
};

module.exports = {
    Update
};