//let CommonCreate = require("./Create");
var _ = require('lodash');
let fs = require("fs");
let path = require("path");
let CommonFileCheck = require("../../../Check");

let RowsAsObjectsWithColumns = ({ inFolderName, inFileNameWithExtension, inItemName, inUserPK, inKeysArrayNeeded }) => {
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
                LocalReturnObject = PrepareScreenObject({ inData: LocalReturnData[inItemName], inKeysArrayNeeded });
            };
        };

        return LocalReturnObject;
    };
};

let PrepareScreenObject = ({ inData, inKeysArrayNeeded }) => {
    let LocalLoopObject = {};
    let LocalReturnObject = {};

    Object.entries(inData).forEach(
        ([key, value]) => {
            if ("SubTableColumns" in value) {
                if (Object.keys(value.SubTableColumns).length > 0) {
                    LocalLoopObject = {};
                    LocalLoopObject.ScreenName = key;
                    LocalLoopObject.ScreenNameForHtmlId = key.replace(" ", "_");

                    LocalLoopObject.SubTableColumnsObject = PrepareSubTableObject({
                        inData: value.SubTableColumns,
                        inKeysArrayNeeded
                    });

                    LocalReturnObject[key] = LocalLoopObject;
                };
            };
        }
    );

    return LocalReturnObject;
};

let PrepareSubTableObject = ({ inData, inKeysArrayNeeded }) => {
    let LocalReturnObject = {};

    Object.entries(inData).forEach(
        ([key, value]) => {
            LocalReturnObject[key] = {
                TableColumnsObject: PrepareSubTableColumnObject({
                    inData: value.TableColumns,
                    inKeysArrayNeeded
                })
            }
        }
    );

    return LocalReturnObject;
};

let PrepareSubTableColumnObject = ({ inData, inKeysArrayNeeded }) => {
    let LocalReturnObject = {};
    //let LocalKeysArrayNeeded = ["ShowTotal"];
    let LocalKeysArrayNeeded = inKeysArrayNeeded;
    //console.log("LocalKeysArrayNeeded : ", LocalKeysArrayNeeded);
    inData.forEach(LoopItem => {
        LocalReturnObject[LoopItem.DataAttribute] = _.pick(LoopItem, LocalKeysArrayNeeded);

    });
    return LocalReturnObject;
};

module.exports = {
    RowsAsObjectsWithColumns
};