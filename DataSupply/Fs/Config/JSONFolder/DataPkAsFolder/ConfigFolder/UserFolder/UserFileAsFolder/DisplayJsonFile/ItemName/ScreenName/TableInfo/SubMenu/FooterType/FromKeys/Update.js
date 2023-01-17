let _ = require("lodash");

//let CommonPullDataFromConfig = require("../../../../../PullData/AsJson");
let CommonPullDataFromConfig = require("../../../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../../../PushData/FromFoldFile");


let Update = async ({ DataPK, FolderName, FileName, ItemName, ScreenName, DataAttribute, BodyAsJson }) => {
    const LocalDataToUpdate = (({ CreateNew, ShowBalance, ShowTotals }) => ({ CreateNew, ShowBalance, ShowTotals }))(BodyAsJson);

    console.log("ccccccccccccbbbbbbbb : ", LocalDataToUpdate);

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
    //console.log("ccccccccccccbbbbbbbb : ");


    if (LocalItemName in LocalNewData) {
        if (LocalScreenName in LocalNewData[LocalItemName]) {
            if ("TableInfo" in LocalNewData[LocalItemName][LocalScreenName]) {
                //   console.log("bbbbbbbb : ", LocalNewData[LocalItemName][LocalScreenName].TableInfo.FooterType);

                LocalNewData[LocalItemName][LocalScreenName].TableInfo.FooterType.CreateNew = LocalDataToUpdate.CreateNew;
                LocalNewData[LocalItemName][LocalScreenName].TableInfo.FooterType.ShowBalance = LocalDataToUpdate.ShowBalance;
                LocalNewData[LocalItemName][LocalScreenName].TableInfo.FooterType.ShowTotals = LocalDataToUpdate.ShowTotals;

                //LocalNewData[LocalItemName][LocalScreenName].TableInfo.FooterType.ShowFooter = LocalDataToUpdate.ShowFooter;
                // LocalNewData[LocalItemName][LocalScreenName].TableInfo.FooterType.CreateNew = LocalDataToUpdate.CreateNew;
                // LocalNewData[LocalItemName][LocalScreenName].TableInfo.FooterType.ShowTotals = LocalDataToUpdate.ShowTotals;

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