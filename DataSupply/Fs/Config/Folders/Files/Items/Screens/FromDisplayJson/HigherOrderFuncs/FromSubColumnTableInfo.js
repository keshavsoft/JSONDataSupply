var _ = require('lodash');
let fs = require("fs");
let path = require("path");
let CommonFileCheck = require("../../../../Check");

let PrepareScreenObject = ({ inData, inFuncToRun }) => {
    let LocalLoopObject = {};
    let LocalReturnObject = {};

    Object.entries(inData).forEach(
        ([key, value]) => {
            if ("SubTableColumns" in value) {
                if (Object.keys(value.SubTableColumns).length > 0) {
                    LocalLoopObject = {};
                    LocalLoopObject.ScreenName = key;
                    LocalLoopObject.ScreenNameForHtmlId = key.replace(" ", "_");

                    LocalLoopObject.SubTableColumnsObject = inFuncToRun({
                        inData: value.SubTableColumns
                    });

                    LocalReturnObject[key] = LocalLoopObject;
                };
            };
        }
    );

    return LocalReturnObject;
};

let startFunc = ({ inFolderName, inFileNameWithExtension, inItemName, inUserPK, inFuncToRun }) => {
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
                //LocalReturnObject = inFuncToRun({ inData: LocalReturnData[inItemName] });
                LocalReturnObject = PrepareScreenObject({ inData: LocalReturnData[inItemName], inFuncToRun });
            };
        };

        return LocalReturnObject;
    };
};

let startFunc1 = ({ inFolderName, inFileNameWithExtension, inItemName, inUserPK, inFuncToRun }) => {
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
                LocalReturnObject = inFuncToRun({ inData: LocalReturnData[inItemName] });
            };
        };

        return LocalReturnObject;
    };
};

module.exports = {
    startFunc
};