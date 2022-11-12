const fs = require("fs-extra");
let CommonAbsolutePath = require("../../../DataPath");
let CommonCreateFolders = require("../CreateFolders/Basic");
let CommonCheck = require("../../Check/ForFolder");

let StartFunc = async ({ inUserPK }) => {
    let LocalReturnData = { KTF: false, KReason: "" };
    let LocalReturnFromCreateFolder;

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    let LocalFolderPath = `${GlobalDataPath}\\${inUserPK}`

    try {
        if (fs.existsSync(LocalFolderPath)) {
            LocalReturnData.KReason = "Data is already present on the server";
        } else {
            LocalReturnFromCreateFolder = await CommonCreateFolders.StartFunc({ inFolderPath: LocalFolderPath });

            if (LocalReturnFromCreateFolder.KTF) {
                LocalReturnData.KTF = true;
            };
        };
    } catch (error) {
        console.log("error : ", error);
    };

    return await LocalReturnData;
};

module.exports = { StartFunc };