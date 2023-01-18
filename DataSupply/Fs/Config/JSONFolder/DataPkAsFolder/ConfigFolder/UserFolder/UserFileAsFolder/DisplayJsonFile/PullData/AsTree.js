let _ = require("lodash");

let CommonFromAsJson = require("./AsJson");

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

                            Object.entries(ScreenValue.SubTableColumns).forEach(
                                ([SubTableColumnskey, SubTableColumnsvalue]) => {
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
    };

    return await LocalReturnObject;
};

let AsObjects_18Jan2022 = async ({ inFolderName, inFileNameOnly, inDataPK }) => {
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
                        LocalScreenObject.SubTableColumns = ScreenValue.SubTableColumns;

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

module.exports = {
    AsObjects
};