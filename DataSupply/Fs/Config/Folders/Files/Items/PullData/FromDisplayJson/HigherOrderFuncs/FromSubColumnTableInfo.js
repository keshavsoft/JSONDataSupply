//let CommonCheck = require("../../../../../../../Files/Check");

let CommonScreens = require("../../../Screens/FromDisplayJson/HigherOrderFuncs/FromSubColumnTableInfo");
let CommonCheck = require("../../../../Check/InDataFolder");

let fs = require("fs");

let StartFunc = ({ inFolderName, inFileNameWithExtension, inUserPK, inFuncToRun }) => {
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
                    LocalLoopObject = {};
                    LocalLoopObject.ItemName = key;
                    LocalLoopObject.ItemNameForHtmlId = key.replace(" ", "_");
                    LocalFromScreens = CommonScreens.startFunc({
                        inFolderName,
                        inFileNameWithExtension,
                        inItemName: key,
                        inUserPK,
                        inFuncToRun
                    });

                    LocalLoopObject.Screens = LocalFromScreens
                    LocalReturnObject[key.replace(" ", "_")] = LocalLoopObject;
                }
            );
        };

        return LocalReturnObject;
    };
};

module.exports = {
    StartFunc
};