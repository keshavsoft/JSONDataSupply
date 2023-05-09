// let CommonFromAsJson = require("./AsJson");
let CommonFromAsJson = require("./DisplayJsonFile/PullData/AsJson");
let CommonFromReturnDataJsonFile = require("./ReturnDataJsonFile/PullData/AsJson");

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
                        LocalScreenObject.TableInfo = ScreenValue.TableInfo;

                        LocalScreenObject.TableColumnsObject = {};

                        ScreenValue.TableColumns.forEach(LoopTableColumn => {
                            LocalScreenObject.TableColumnsObject[LoopTableColumn.DataAttribute] = LoopTableColumn;
                        });

                        if ("SubTableColumns" in ScreenValue) {
                            LocalScreenObject.SubTableColumnsObject = {};
                            LocalScreenObject.SubTableInfo = {};


                            Object.entries(ScreenValue.SubTableColumns).forEach(
                                ([SubTableColumnskey, SubTableColumnsvalue]) => {
                                    // LocalScreenObject.TableInfo = ScreenValue.TableInfo;
                                    LocalScreenObject.SubTableInfo[SubTableColumnskey] = SubTableColumnsvalue.TableInfo;


                                    let LoopInsideObject = {};
                                    LoopInsideObject.TableColumnsObject = {};

                                    SubTableColumnsvalue.TableColumns.forEach(LoopTableColumn => {
                                        LoopInsideObject.TableColumnsObject[LoopTableColumn.DataAttribute] = LoopTableColumn;
                                    });

                                    LocalScreenObject.SubTableColumnsObject[SubTableColumnskey] = LoopInsideObject;
                                }
                            );
                        };

                        // LocalScreenObject.SubTableColumns = ScreenValue.SubTableColumns;

                        LocalLoopObject.Screens[ScreenKey] = LocalScreenObject;
                    }
                );

                LocalReturnObject.JsonData[key.replace(" ", "_")] = LocalLoopObject;
            }
        );

        LocalReturnObject.KTF = true;

        await LocalFuncInsertReturnData({
            inData: LocalReturnObject.JsonData,
            inFolderName, inFileNameOnly, inDataPK
        });
    };

    return await LocalReturnObject;
};

let LocalFuncInsertReturnData = async ({ inData, inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalFromJson = await CommonFromReturnDataJsonFile.StartFunc({ inFolderName, inFileNameOnly, inDataPK });

    Object.entries(inData).forEach(
        ([keyOfItem, valueOfItem]) => {
            LoopInsideItemPresent = LocalFromJson.JsonData.hasOwnProperty(keyOfItem);

            if (LoopInsideItemPresent) {
                Object.entries(valueOfItem.Screens).forEach(
                    ([keyOfScreen, valueOfScreen]) => {
                        LoopInsideScreenPresent = LocalFromJson.JsonData[keyOfItem].hasOwnProperty(keyOfScreen);

                        if (LoopInsideScreenPresent) {
                            // valueOfScreen.ReturnDataJsonContent = {};
                            valueOfScreen.ReturnDataJsonContent = LocalFromJson.JsonData[keyOfItem][keyOfScreen];
                        };
                        // console.log("key : ", keyOfScreen, LoopInsideScreenPresent, valueOfScreen);
                    }
                );

            };
        }
    );
};

module.exports = {
    AsObjects
};