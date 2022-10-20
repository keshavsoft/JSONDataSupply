//let CommonCheck = require("../../../../../../Files/Check");
let CommonScreens = require("../../Screens/TableColumns/WithOutSubTableColumns");
let CommonCheck = require("../../../Check/InDataFolder");

let fs = require("fs");

let RowsAsObjectsWithColumns = ({ inFolderName, inFileNameWithExtension, inUserPK }) => {
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
                    //    LocalLoopObject.RowCount = Object.keys(value).length;
                    LocalLoopObject.Screens = CommonScreens.RowsAsObjectsWithColumns({
                        inFolderName,
                        inFileNameWithExtension,
                        inItemName: key,
                        inUserPK
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