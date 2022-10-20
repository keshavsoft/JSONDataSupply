//let CommonCheck = require("../../../../../Files/Check");
let CommonScreens = require("../../../Screens/FromDisplayJson/HigherOrderFuncs/ForTableColumns");
let CommonCheck = require("../../../../Check/InDataFolder");

let fs = require("fs");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inUserPK, inFuncToRun }) => {
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFilePath;
        let LocalLoopObject = {};
        let LocalReturnObject = {};

        LocalDataFromCommonCreate = await CommonCheck.StartFunc({ inFolderName, inFileNameWithExtension, inUserPK });
        
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
                    LocalLoopObject.Screens = CommonScreens.StartFunc({
                        inFolderName,
                        inFileNameWithExtension,
                        inItemName: key,
                        inUserPK,
                        inFuncToRun
                    });

                    LocalReturnObject[key.replace(" ", "_")] = LocalLoopObject;
                }
            );
        };

        return await LocalReturnObject;
    };
};

module.exports = {
    StartFunc
};