var _ = require('lodash');
let fs = require("fs");
let path = require("path");
let CommonFileCheck = require("../../../Check");

let RowsAsObjectsWithColumns = ({ inFolderName, inFileNameWithExtension, inItemName, inUserPK, inFromKey, inKeyToPull }) => {
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalFromFileCheck;
        let LocalDataFromJSON;
        let LocalFilePath;
        let LocalReturnObject = {};

        LocalFromFileCheck = CommonFileCheck.InConfig({
            inFolderName,
            inFileNameOnly: path.parse(inFileNameWithExtension).name,
            inUserPK
        });

        if (LocalFromFileCheck.KTF) {
            LocalFilePath = LocalFromFileCheck.FilePath;

            LocalDataFromJSON = fs.readFileSync(LocalFilePath);
            LocalReturnData = JSON.parse(LocalDataFromJSON);

            if (inItemName in LocalReturnData) {
                LocalReturnObject = CommonFuncs.PrepareScreenObject.startFunc({ inData: LocalReturnData[inItemName], inFromKey, inKeyToPull });
            };
        };

        return LocalReturnObject;
    };
};

class CommonFuncs {
    static PrepareScreenObject = {
        startFunc: ({ inData, inFromKey, inKeyToPull }) => {
            switch (inFromKey) {
                case "TableInfo":
                    return this.PrepareScreenObject.FromTableInfo({ inData, inFromKey, inKeyToPull });
                    break;

                default:
                    break;
            }
        },
        FromTableColumns: ({ inData, inFromKey, inKeyToPull }) => {
            let LocalLoopObject = {};
            let LocalReturnObject = {};
            console.log("inFromKey, inKeyToPull : ", inFromKey, inKeyToPull);
            Object.entries(inData).forEach(
                ([key, value]) => {
                    LocalLoopObject = {};
                    LocalLoopObject.ScreenName = key;
                    LocalLoopObject.ScreenNameForHtmlId = key.replace(" ", "_");
                    if ("TableColumns" in value) {
                        LocalLoopObject.TableColumnsObject = PrepareTableColumnObject({
                            inData: value.TableColumns,
                            inFromKey, inKeyToPull
                        });
                    };

                    LocalReturnObject[key] = LocalLoopObject;
                }
            );

            return LocalReturnObject;
        },
        FromTableInfo: ({ inData, inFromKey, inKeyToPull }) => {
            let LocalLoopObject = {};
            let LocalReturnObject = {};
            
            Object.entries(inData).forEach(
                ([key, value]) => {
                    LocalLoopObject = {};
                    LocalLoopObject.ScreenName = key;
                    LocalLoopObject.ScreenNameForHtmlId = key.replace(" ", "_");
                    if ("TableInfo" in value) {
                        LocalLoopObject.TableInfoObject = _.pick(_.get(value.TableInfo, inKeyToPull), ["PrintToPrinter", "Show", "Delete","Show"]);
                    };

                    LocalReturnObject[key] = LocalLoopObject;
                }
            );

            return LocalReturnObject;
        }
    }
};

let PrepareTableColumnObject = ({ inData, inFromKey, inKeyToPull }) => {
    let LocalReturnObject = {};
    let LocalShowColumns = inData.filter(element => element.CreateNew);
    let LocalKeyNeeded = inKeyToPull;
    
    LocalShowColumns.forEach(LoopItem => {
        LocalReturnObject[LoopItem.DataAttribute] = {
            DataAttribute: LoopItem.DataAttribute,
            DisplayName: LoopItem.DisplayName
        };

        LocalReturnObject[LoopItem.DataAttribute] = { ...LocalReturnObject[LoopItem.DataAttribute], ..._.get(LoopItem, LocalKeyNeeded) };
    });

    return LocalReturnObject;
};

module.exports = {
    RowsAsObjectsWithColumns
};