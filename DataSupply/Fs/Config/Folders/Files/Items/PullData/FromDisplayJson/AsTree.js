//let CommonCheck = require("../../../../../../Files/Check");
let CommonScreens = require("../../Screens/FromDisplayJson/AsTree");
let CommonCheck = require("../../../Check/InDataFolder");

let fs = require("fs");

let RowsAsObjectsWithColumns = ({ inFolderName, inFileNameWithExtension, inUserPK, inFromKey, inKeyToPull  }) => {
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFilePath;
        let LocalLoopObject = {};
        let LocalReturnObject = {};

        LocalDataFromCommonCreate = CommonCheck.StartFunc({ inFolderName, inFileNameWithExtension, inUserPK });

        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.FilePath

            LocalDataFromJSON = fs.readFileSync(LocalFilePath);
            LocalReturnData = JSON.parse(LocalDataFromJSON);

            Object.entries(LocalReturnData).forEach(
                ([key, value]) => {
                    LocalLoopObject = {};
                    LocalLoopObject.ItemName = key;
                    LocalLoopObject.ItemNameForHtmlId = key.replace(" ", "_");
                    LocalLoopObject.Screens = CommonScreens.RowsAsObjectsWithColumns({
                        inFolderName,
                        inFileNameWithExtension,
                        inItemName: key,
                        inUserPK,
                        inFromKey, inKeyToPull 
                    });

                    LocalReturnObject[key.replace(" ", "_")] = LocalLoopObject;
                }
            );
        };

        return LocalReturnObject;
    };
};

module.exports = {
    RowsAsObjectsWithColumns
};