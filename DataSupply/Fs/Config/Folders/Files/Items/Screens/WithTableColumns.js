let fs = require("fs");
let path = require("path");
let CommonFileCheck = require("../../Check");

let RowsAsObjectsWithColumns = ({ inFolderName, inFileNameWithExtension, inItemName, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalFromFileCheck;
        let LocalDataFromJSON;
        let LocalFilePath;
        let LocalFileName = "Display.json";
        let LocalReturnObject = {};

        LocalFromFileCheck = CommonFileCheck.InConfig({
            inFolderName,
            inFileNameOnly: path.parse(inFileNameWithExtension).name,
            inUserPK
        });

        if (LocalFromFileCheck.KTF) {
            //LocalFilePath = `${LocalFromFileCheck.FilePath}/${LocalFileName}`;
            LocalFilePath = LocalFromFileCheck.FilePath;

            LocalDataFromJSON = fs.readFileSync(LocalFilePath);
            LocalReturnData = JSON.parse(LocalDataFromJSON);
            //   console.log("LocalReturnData : ", LocalReturnData, inItemName);
            if (inItemName in LocalReturnData) {
                LocalReturnObject = PrepareScreenObject({ inData: LocalReturnData[inItemName] });
            };
        };

        return LocalReturnObject;
    };
};

let PrepareScreenObject = ({ inData }) => {
    let LocalLoopObject = {};
    let LocalReturnObject = {};

    Object.entries(inData).forEach(
        ([key, value]) => {
            LocalLoopObject = {};
            LocalLoopObject.ScreenName = key;
            LocalLoopObject.ScreenNameForHtmlId = key.replace(" ", "_");
            if ("TableColumns" in value) {
                LocalLoopObject.TableColumnsObject = PrepareTableColumnObject({ inData: value.TableColumns });
            };

            LocalReturnObject[key] = LocalLoopObject;
        }
    );

    return LocalReturnObject;
};

let PrepareTableColumnFuncs = {
    ForToggles: ({ inData }) => {
        let LocalLoopObject = {};
        let LocalReturnObject = {};
        inData.forEach(LoopItem => {
            LocalReturnObject[LoopItem.DataAttribute] = {
                DataAttribute: LoopItem.DataAttribute,
                DisplayName: LoopItem.DisplayName,
                ShowInTable: LoopItem.ShowInTable,
                Insert: LoopItem.Insert,
                CreateNew: LoopItem.CreateNew
            };
        });
        return LocalReturnObject;
    },
    ForKDataset: ({ inData }) => {
        let LocalReturnObject = {};
        inData.forEach(LoopItem => {
            LocalReturnObject[LoopItem.DataAttribute] = {
                DataAttribute: LoopItem.DataAttribute,
                DisplayName: LoopItem.DisplayName,
                ShowInTable: LoopItem.ShowInTable,
                Insert: LoopItem.Insert,
                CreateNew: LoopItem.CreateNew
            };
        });
        return LocalReturnObject;
    }
}

let PrepareTableColumnObject = ({ inData }) => {
    let LocalReturnObject = {};
    inData.forEach(LoopItem => {
        LocalReturnObject[LoopItem.DataAttribute] = {
            DataAttribute: LoopItem.DataAttribute,
            DisplayName: LoopItem.DisplayName,
            ShowInTable: LoopItem.ShowInTable,
            Insert: LoopItem.Insert,
            CreateNew: LoopItem.CreateNew,
            IsTextArea: LoopItem.IsTextArea
        };
    });
    return LocalReturnObject;
};

module.exports = {
    RowsAsObjectsWithColumns
};