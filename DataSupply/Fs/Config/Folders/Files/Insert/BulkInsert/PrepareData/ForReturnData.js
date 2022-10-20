const ReturnDataObject = require("../../../../../../../Fix/Json/ReturnData.json");

let CommonFromScreens = require("../../../../../../Templates/FromScreens");

let FChange = ({ inObjToChange, inObjWithValues }) => {
    Object.entries(inObjToChange).forEach(
        ([key, value]) => {
            if (key in inObjWithValues) {
                if (typeof value === "object") {
                    FChange({
                        inObjToChange: inObjToChange[key],
                        inObjWithValues: inObjWithValues[key]
                    });
                } else {
                    inObjToChange[key] = inObjWithValues[key];
                };

            };
        });
};

class TableColumnFuncs {
    InsertDefaultValue({ inInsertMode, inLoopItem, inKey }) {
        switch (inInsertMode) {
            case "FromKey":
                inLoopItem.DefaultValue = inKey;
                break;

            default:
                break;
        }
    }

    ForReturnData = {
        WithPredefinedValues: ({ inScreenValue }) => {
            let LocalReturnDataObject = JSON.parse(JSON.stringify(ReturnDataObject));

            if ("ReturnData" in inScreenValue) {
                FChange({
                    inObjToChange: LocalReturnDataObject,
                    inObjWithValues: inScreenValue.ReturnData
                });
            };

            return LocalReturnDataObject;
        }
    }
};

let CommonTableColumnFuncsObject = new TableColumnFuncs();

let CommonFuncs = {
    LoopFunc: ({ inJsonConfig, inKey, inUserPK, inItemDataValue }) => {
        let LocalReturnObject = {};

        LocalReturnObject[inKey] = CommonFuncs.ColumnsFuncs.ForScreens({
            inUserPK, inJsonConfig, inItemDataValue,
            inItemName: inKey
        });

        return LocalReturnObject;
    },
    ColumnsFuncs: {
        ForScreens: ({ inUserPK, inJsonConfig, inItemDataValue, inItemName }) => {
            let LocalReturnObject = {};
            let LocalFolderName = inJsonConfig.inFolderName;
            let LocalJsonFileName = inJsonConfig.inJsonFileName;
            let LocalReturnDataObject;

            let LocalFromScreens = CommonFromScreens.FoldersAsObject({ inUserPK });

            if (LocalFolderName in LocalFromScreens) {
                Object.entries(LocalFromScreens[LocalFolderName]).forEach(
                    async ([key, value]) => {
                        LocalReturnDataObject = CommonTableColumnFuncsObject.ForReturnData.WithPredefinedValues({
                            inScreenValue: value
                        });

                        LocalReturnObject[key] = LocalReturnDataObject;
                    }
                );
            };

            return LocalReturnObject;
        }
    }
};

let ReturnData = async ({ inFolderName, inFileName, inDataToInsert, inUserPK }) => {
    let LocalDataToDisplay;

    let LocalJsonConfig = {
        inFolderName,
        inJsonFileName: `${inFileName}.json`
    };

    Object.entries(inDataToInsert).forEach(
        ([key, value]) => {
            LocalObjectFromLoop = CommonFuncs.LoopFunc({
                inJsonConfig: LocalJsonConfig,
                inKey: key,
                inUserPK,
                inItemDataValue: value
            });

            LocalDataToDisplay = { ...LocalDataToDisplay, ...LocalObjectFromLoop };
        }
    );

    return await LocalDataToDisplay;
};

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inDataToInsert, inUserPK }) => {
    let LocalReturnObject = { KTF: false, KResultObject: {} };

    //console.log("lkkkkkkkkkkkkk : ", inFileNameWithExtension);

    try {
        let LocalJsonConfig = {
            inFolderName,
            inJsonFileName: inFileNameWithExtension
        };

        Object.entries(inDataToInsert).forEach(
            ([key, value]) => {
                LocalObjectFromLoop = CommonFuncs.LoopFunc({
                    inJsonConfig: LocalJsonConfig,
                    inKey: key,
                    inUserPK,
                    inItemDataValue: value
                });

                LocalReturnObject.KTF = true;
                LocalReturnObject.KResultObject = { ...LocalObjectFromLoop };
            }
        );
    } catch (error) {
        console.log("For Bulk error : ", error);
    };

    return await LocalReturnObject;
};

module.exports = { ReturnData, StartFunc };
