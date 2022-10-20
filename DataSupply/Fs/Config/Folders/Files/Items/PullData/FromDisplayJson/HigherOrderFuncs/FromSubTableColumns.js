//let CommonCheck = require("../../../../../Files/Check");
let CommonScreens = require("../../../Screens/FromDisplayJson/HigherOrderFuncs/FromSubTableColumns");
let CommonCheck = require("../../../../Check/InDataFolder");

let fs = require("fs");

let StartFunc = ({ inFolderName, inFileNameWithExtension, inUserPK, inKeysArrayNeeded, inFuncToRun }) => {
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFilePath;
        let LocalLoopObject = {};
        let LocalReturnObject = {};
        let LocalFromScreens;

        LocalDataFromCommonCreate = CommonCheck.StartFunc({ inFolderName, inFileNameWithExtension, inUserPK });

        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.FilePath

            LocalDataFromJSON = fs.readFileSync(LocalFilePath);
            LocalReturnData = JSON.parse(LocalDataFromJSON);

            Object.entries(LocalReturnData).forEach(
                ([key, value]) => {
                    LocalFromScreens = CommonScreens.StartFunc({
                        inFolderName,
                        inFileNameWithExtension,
                        inItemName: key,
                        inUserPK,
                        inKeysArrayNeeded,
                        inFuncToRun
                    });

                    if (Object.keys(LocalFromScreens).length > 0) {
                        LocalLoopObject = {};
                        LocalLoopObject.ItemName = key;
                        LocalLoopObject.ItemNameForHtmlId = key.replace(" ", "_");

                        LocalLoopObject.Screens = LocalFromScreens;

                        LocalReturnObject[key.replace(" ", "_")] = LocalLoopObject;
                    };
                }
            );
        };

        return LocalReturnObject;
    };
};

module.exports = {
    StartFunc
};