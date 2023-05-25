let CommonPullDataFromConfig = require("../../../../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../../../../PushData/FromFoldFile");

let Update = async ({ DataPK, FolderName, FileName, ItemName, ScreenName, BodyAsJson }) => {

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

// UpdateKeys({
//     DataPK: 16, folderName: "Masters", FileName: "Customers.json", ItemName: "CustomersName", ScreenName: "Create",
//     DataAttribute: "pk",
//     BodyAsJson: {
//         DisplayName: "ppppppppppp"
//     }
// }).then(p => {
//     console.log("pppp : ", p);
// });


module.exports = {
    Update
};