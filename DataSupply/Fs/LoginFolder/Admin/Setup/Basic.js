const fs = require("fs-extra");
let CommonCreateFolders = require("../CreateFolders/Basic");
let CommonCheck = require("../../../Config/JSONFolder/DataPkAsFolder/Check");

let StartFunc = async ({ inUserPK }) => {
    let localinUserPK = inUserPK;
    let LocalReturnData = { KTF: false, KReason: "" };
    let LocalReturnFromCreateFolder;

    let localCommonCheck = CommonCheck.ForExistence({ inDataPK: localinUserPK });

    if (localCommonCheck.KTF) {
        LocalReturnData.KReason = "Data is already present on the server";
        return await LocalReturnData;
    };

    try {
        LocalReturnFromCreateFolder = await CommonCreateFolders.StartFunc({ inFolderPath: localCommonCheck.DataPKPath });

        if (LocalReturnFromCreateFolder.KTF) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {
        console.log("error : ", error);
    };
    return await LocalReturnData;
};

module.exports = { StartFunc };