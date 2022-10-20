//let CommonCreate = require("./Create");
let fs = require("fs");
let path = require("path");
let CommonFileCheck = require("../../../Check");

let RowsAsObjectsWithColumns = ({ inFolderName, inFileNameWithExtension, inItemName, inUserPK }) => {
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
            
            if ("SubTableColumns" in value) {
                LocalLoopObject.SubTableColumnsObject = PrepareSubTableObject({ inData: value.SubTableColumns });
            };

            LocalReturnObject[key] = LocalLoopObject;
        }
    );

    return LocalReturnObject;
};

let PrepareSubTableObject = ({ inData }) => {
    let LocalReturnObject = {};
    
    Object.entries(inData).forEach(
        ([key, value]) => {
            LocalReturnObject[key] = {
                TableColumns: PrepareSubTableColumnObject({ inData: value.TableColumns })
            }
        }
    );

    return LocalReturnObject;
};

let PrepareSubTableColumnObject = ({ inData }) => {
    let LocalReturnObject = {};
    inData.forEach(LoopItem => {
        LocalReturnObject[LoopItem.DataAttribute] = {
            DataAttribute: LoopItem.DataAttribute,
            DisplayName: LoopItem.DisplayName
        };
    });
    return LocalReturnObject;
};

// console.log(RowsAsObjectsWithColumns({
//     inFolderName: "Transactions",
//     inFileNameWithExtension: "JOURNALS.json", inItemName: "JOURNAL", inUserPK: 1016
// }));

module.exports = {
    RowsAsObjectsWithColumns
};