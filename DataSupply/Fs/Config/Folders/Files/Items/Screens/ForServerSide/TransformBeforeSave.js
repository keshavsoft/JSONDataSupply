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

let PrepareTableColumnObject1 = ({ inData }) => {
    let LocalReturnObject = {};
    let LocalShowColumns = inData.filter(element => element.CreateNew);
    let LocalKeyNeeded = "TransformBeforeSave";

    LocalShowColumns.forEach(LoopItem => {
        LocalReturnObject[LoopItem.DataAttribute] = {
            DataAttribute: LoopItem.DataAttribute,
            DisplayName: LoopItem.DisplayName
        };

        if (LocalKeyNeeded in LoopItem.ServerSide) {
            if ("Validate" in LoopItem.ServerSide[LocalKeyNeeded]) {
                LocalReturnObject[LoopItem.DataAttribute].Validate = LoopItem.ServerSide[LocalKeyNeeded].Validate
            };

            if ("Type" in LoopItem.ServerSide[LocalKeyNeeded]) {
                LocalReturnObject[LoopItem.DataAttribute].Type = LoopItem.ServerSide[LocalKeyNeeded].Type
            };
        };
    });
    return LocalReturnObject;
};

let PrepareTableColumnObject = ({ inData, inKeyForServerSide }) => {
    //console.log("inKeyForServerSide:",inKeyForServerSide);
    let LocalReturnObject = {};
    let LocalShowColumns = inData.filter(element => element.CreateNew);
    //let LocalKeyNeeded = "TransformBeforeSave";
    let LocalKeyNeeded = inKeyForServerSide;

    LocalShowColumns.forEach(LoopItem => {
        LocalReturnObject[LoopItem.DataAttribute] = {
            DataAttribute: LoopItem.DataAttribute,
            DisplayName: LoopItem.DisplayName
        };

        LocalReturnObject[LoopItem.DataAttribute] = { ...LocalReturnObject[LoopItem.DataAttribute], ...LoopItem.ServerSide[LocalKeyNeeded] };

        // if (LocalKeyNeeded in LoopItem.ServerSide) {
        //     if ("Validate" in LoopItem.ServerSide[LocalKeyNeeded]) {
        //         LocalReturnObject[LoopItem.DataAttribute].Validate = LoopItem.ServerSide[LocalKeyNeeded].Validate
        //     };

        //     if ("Type" in LoopItem.ServerSide[LocalKeyNeeded]) {
        //         LocalReturnObject[LoopItem.DataAttribute].Type = LoopItem.ServerSide[LocalKeyNeeded].Type
        //     };
        // };

    });
    return LocalReturnObject;
};

module.exports = {
    RowsAsObjectsWithColumns
};