// let CommonCheck = require("../Check");
let path = require("path");
// let fs = require("fs");

let CommonScreenCheck = require("../../../Check");

let FromReturnDataJson = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalReturnObject = { KTF: false, KResult: {} };

        let LocalFromScreenCheck = CommonScreenCheck.InConfig({
            inFolderName,
            inFileNameOnly: path.parse(inFileNameWithExtension).name,
            inItemName,
            inScreenName,
            inUserPK
        });

        if (LocalFromScreenCheck.KTF) {
            LocalReturnObject.KTF = true;
            LocalReturnObject.DisplayJsonData = LocalFromScreenCheck.DisplayJsonData;
            LocalReturnObject.ReturnDataJsonData = LocalFromScreenCheck.ReturnDataJsonData;
        }

        return await LocalReturnObject;
    };
};

module.exports = {
    FromReturnDataJson
};