var _ = require('lodash');
let fs = require("fs");
let path = require("path");
let CommonFileCheck = require("../../../Check");

let RowsAsObjectsWithColumns = ({ inFolderName, inFileNameWithExtension, inItemName, inUserPK, inKeyForServerSide }) => {
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
            //   console.log("LocalReturnData : ", LocalReturnData, inItemName);
            if (inItemName in LocalReturnData) {
                LocalReturnObject = PrepareScreenObject({ inData: LocalReturnData[inItemName], inKeyForServerSide });
            };
        };

        return LocalReturnObject;
    };
};

let PrepareScreenObject = ({ inData, inKeyForServerSide }) => {
    let LocalLoopObject = {};
    let LocalReturnObject = {};

    Object.entries(inData).forEach(
        ([key, value]) => {
            LocalLoopObject = {};
            LocalLoopObject.ScreenName = key;
            LocalLoopObject.ScreenNameForHtmlId = key.replace(" ", "_");
            if ("TableColumns" in value) {
                LocalLoopObject.TableColumnsObject = PrepareTableColumnObject({
                    inData: value.TableColumns,
                    inKeyForServerSide
                });
            };

            LocalReturnObject[key] = LocalLoopObject;
        }
    );

    return LocalReturnObject;
};

let PrepareTableColumnObject = ({ inData, inKeyForServerSide }) => {
    let LocalReturnObject = {};
    let LocalShowColumns = inData.filter(element => element.CreateNew);
    let LocalKeyNeeded = inKeyForServerSide;
    //console.log("LocalKeyNeeded : ", LocalKeyNeeded);
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