var _ = require('lodash');
let fs = require("fs");
let path = require("path");
let CommonFileCheck = require("../../../../Check");

let ColumnReOrder = ({ inFolderName, inFileNameWithExtension, inItemName, inUserPK }) => {
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
                LocalReturnObject = CommonFuncs.PrepareScreenObject.startFunc({ inData: LocalReturnData[inItemName] });
            };
        };

        return LocalReturnObject;
    };
};

let MainKeys = ({ inFolderName, inFileNameWithExtension, inItemName, inUserPK }) => {
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
                LocalReturnObject = CommonFuncs.MainKeys({ inData: LocalReturnData[inItemName] });
            };
        };

        return LocalReturnObject;
    };
};

class CommonFuncs {
    static PrepareScreenObject = {
        startFunc: ({ inData }) => {
            return this.PrepareScreenObject.FromTableInfo({ inData });
        },
        FromTableInfo: ({ inData }) => {
            let LocalLoopObject = {};
            let LocalReturnObject = {};
            Object.entries(inData).forEach(
                ([key, value]) => {
                    LocalLoopObject = {};
                    LocalLoopObject.ScreenName = key;
                    LocalLoopObject.ScreenNameForHtmlId = key.replace(" ", "_");
                    if ("TableInfo" in value) {
                        LocalLoopObject.ColumnReOrder = value.TableInfo.ColumnReOrder;
                    };
                    LocalReturnObject[key] = LocalLoopObject;
                }
            );

            return LocalReturnObject;
        }

    }

    static MainKeys = ({ inData }) => {
        let LocalLoopObject = {};
        let LocalReturnObject = {};

        Object.entries(inData).forEach(
            ([key, value]) => {
                LocalLoopObject = {};
                LocalLoopObject.ScreenName = key;
                LocalLoopObject.ScreenNameForHtmlId = key.replace(" ", "_");

                if ("TableInfo" in value) {
                    LocalLoopObject.ColumnReOrder = value.TableInfo.ColumnReOrder;
                    LocalLoopObject.kPK = value.TableInfo.kPK;
                    LocalLoopObject.ShowFooter = value.TableInfo.ShowFooter;
                };

                LocalReturnObject[key] = LocalLoopObject;
            }
        );
        
        return LocalReturnObject;
    }
};

module.exports = {
    ColumnReOrder,
    MainKeys
};