var _ = require('lodash');
let fs = require("fs");
let path = require("path");
let CommonFileCheck = require("../../../../Check");

let StartFunc = ({ inFolderName, inFileNameWithExtension, inItemName, inUserPK, inKeysArrayNeeded, inFuncToRun }) => {
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
                LocalReturnObject = PrepareScreenObject({ inData: LocalReturnData[inItemName], inKeysArrayNeeded, inFuncToRun });
            };
        };

        return LocalReturnObject;
    };
};

let PrepareScreenObject = ({ inData, inKeysArrayNeeded, inFuncToRun }) => {
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
                        inKeysArrayNeeded,
                        inFuncToRun
                    });

                    LocalReturnObject[key] = LocalLoopObject;
                };
            };
        }
    );

    return LocalReturnObject;
};

let PrepareSubTableObject = ({ inData, inKeysArrayNeeded, inFuncToRun }) => {
    let LocalReturnObject = {};

    Object.entries(inData).forEach(
        ([key, value]) => {
            LocalReturnObject[key] = {
                TableColumnsObject: inFuncToRun({
                    inData: value.TableColumns,
                    inKeysArrayNeeded
                })
            }
        }
    );

    return LocalReturnObject;
};

let PrepareSubTableColumnObject1 = ({ inData }) => {
    let LocalReturnObject = {};
    let LocalKeyNeeded = "Widths";

    inData.forEach(LoopItem => {
        LocalReturnObject[LoopItem.DataAttribute] = {
            DataAttribute: LoopItem.DataAttribute,
            DisplayName: LoopItem.DisplayName
        };

        LocalReturnObject[LoopItem.DataAttribute] = { ...LocalReturnObject[LoopItem.DataAttribute], ..._.get(LoopItem, LocalKeyNeeded) };
    });

    return LocalReturnObject;
};

module.exports = {
    StartFunc
};