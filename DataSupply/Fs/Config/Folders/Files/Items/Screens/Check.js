let fs = require("fs");
let CommonItemCheck = require("../Check");

let InConfig = ({ inFolderName, inFileNameOnly, inItemName, inScreenName, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", CreatedLog: {} };
    let LocalFromItemCheck = CommonItemCheck.InConfig({ inFolderName, inFileNameOnly, inItemName, inUserPK });

    if (LocalFromItemCheck.KTF) {
        LocalReturnData.KTF = true;
        
        if (inScreenName in LocalFromItemCheck.DisplayJsonData) {
            LocalReturnData.DisplayJsonData = LocalFromItemCheck.DisplayJsonData[inScreenName];
        };

        if (inScreenName in LocalFromItemCheck.DisplayJsonData) {
            LocalReturnData.ReturnDataJsonData = LocalFromItemCheck.ReturnDataJsonData[inScreenName];
        };
    }

    return LocalReturnData;
};

module.exports = { InConfig };