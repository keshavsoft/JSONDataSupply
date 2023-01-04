let _ = require("lodash");

let CommonFromAsJson = require("./AsJson");

// LocalLoopObject = {};
// LocalLoopObject.ItemName = key;
// LocalLoopObject.ItemNameForHtmlId = key.replace(" ", "_");
// //    LocalLoopObject.RowCount = Object.keys(value).length;
// LocalLoopObject.Screens = CommonScreens.RowsAsObjectsWithColumns({
//     inFolderName,
//     inFileNameWithExtension,
//     inItemName: key,
//     inUserPK
// });

// LocalReturnObject[key.replace(" ", "_")] = LocalLoopObject;

let AsObjects = async ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalDataFromCommonCreate;
        let LocalFolderName = inFolderName;
        let LocalFileNameOnly = inFileNameOnly;

        LocalDataFromCommonCreate = await CommonFromAsJson.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameOnly: LocalFileNameOnly,
            inDataPK: LocalDataPK
        });

        if (LocalDataFromCommonCreate.KTF === false) {
            LocalReturnObject.KReason = LocalDataFromCommonCreate.KReason;
            return await LocalReturnObject;
        };

        Object.entries(LocalDataFromCommonCreate.JsonData).forEach(
            ([key, value]) => {
                LocalLoopObject = {};
                LocalLoopObject.ItemName = key;
                LocalLoopObject.ItemNameForHtmlId = key.replace(" ", "_");
                LocalLoopObject.Screens = {};

                Object.entries(value).forEach(
                    ([ScreenKey, ScreenValue]) => {
                        let LocalScreenObject = {};
                        LocalScreenObject.ScreenName = ScreenKey;
                        LocalScreenObject.ScreenNameForHtmlId = ScreenKey.replace(" ", "_");
                        LocalScreenObject.TableColumnsObject = {};
                        LocalScreenObject.TableInfo = ScreenValue.TableInfo;

                        ScreenValue.TableColumns.forEach(LoopTableColumn => {
                            LocalScreenObject.TableColumnsObject[LoopTableColumn.DataAttribute] = LoopTableColumn;
                        });

                        LocalLoopObject.Screens[ScreenKey] = LocalScreenObject;
                    }
                );

                LocalReturnObject.JsonData[key.replace(" ", "_")] = LocalLoopObject;
            }
        );

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

// AsObjects({
//     inFolderName: "Masters",
//     inFileNameOnly: "Accounts",
//     inDataPK: 1022
// }).then(p => {
//     console.log("pppp : ", p.JsonData.Accounts.Screens.Create.TableColumnsObject);
// });

// FromJsonConfig({
//     inJsonConfig:{
//         inFolderName: "Masters",
//         inJsonFileName: "Customers.json"
//     },
//     inDataPK: 16
// }).then(p => {
//     console.log("pppp : ", p);
// });

module.exports = {
    AsObjects
};