let CommonFromCompare = require("../../../Compare/Upload-Json/ForPk");
const fs = require('fs-extra');
let CommonFromJSONUploadFolder = require("../../../JSONUploadFolder/Check");
let CommonFromJSONFolder = require("../../../JSONFolder/Check");

let StartFunc = ({ inJsonPk }) => {
    let LocalReturnObject = {};
    LocalReturnObject.KTF = false;

    let LocalFromCompare = CommonFromCompare.StartFunc();
    let LocalKeys = Object.keys(LocalFromCompare);

    if (LocalKeys.includes(inJsonPk)) {
        let LocalFromUpload = CommonFromJSONUploadFolder.ForExistence();
        let LocalFromJSONFolder = CommonFromJSONFolder.ForExistence();

        if (LocalFromUpload.KTF && LocalFromJSONFolder.KTF) {
            let LocalFromCopy = fs.copySync(`${LocalFromUpload.DataUploadPath}/${inJsonPk}`, `${LocalFromJSONFolder.JSONFolderPath}/${inJsonPk}`);

            LocalReturnObject.KTF = true;
        };
    };

    return LocalReturnObject;
};

let LocalMockFunc = () => {
    let LocalData = StartFunc({ inJsonPk: "901" });
    console.log("LocalData", LocalData);
};

// LocalMockFunc();

module.exports = { StartFunc };
