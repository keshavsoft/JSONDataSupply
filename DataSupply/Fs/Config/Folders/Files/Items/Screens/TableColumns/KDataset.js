let fs = require("fs");
let path = require("path");
let CommonFileCheck = require("../../../Check");

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

let PrepareTableColumnObject = ({ inData }) => {
    let LocalReturnObject = {};
    let LocalShowColumns = inData.filter(element => element.CreateNew);

    LocalShowColumns.forEach(LoopItem => {
        LocalReturnObject[LoopItem.DataAttribute] = {
            DataAttribute: LoopItem.DataAttribute,
            DisplayName: LoopItem.DisplayName,
            HTMLControlType: LoopItem.KDataset.HTMLControlType,
            Min: LoopItem.KDataset.Min,
            Max: LoopItem.KDataset.Max,
            Step: LoopItem.KDataset.Step
        };
    });
    return LocalReturnObject;
};

// console.log(RowsAsObjectsWithColumns({
//     inFolderName: "Masters",
//     inFileNameWithExtension: "Products.json", inItemName: "ProductNames", inUserPK: 1020
// }));

module.exports = {
    RowsAsObjectsWithColumns
};