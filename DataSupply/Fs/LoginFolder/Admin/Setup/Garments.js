const fs = require("fs-extra");
let CommonAbsolutePath = require("../../../DataPath");
let CommonCreateFolders = require("../CreateFolders/Basic");

let StartFunc = async ({ inUserPK }) => {
    let LocalReturnData = { KTF: false, KReason: "" };
    try {
        let LocalReturnFromCreateFolder;

        let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
        let LocalFolderPath = `${GlobalDataPath}/${inUserPK}`
        let LocalFromPath = `${GlobalDataPath}/TemplateDatas/ForTally`;

        if (fs.existsSync(LocalFolderPath)) {
            LocalReturnData.KReason = "Data is already present on the server";
        } else {
            LocalReturnFromCreateFolder = await CommonCreateFolders.StartFunc({ inFolderPath: LocalFolderPath });
            
            if (LocalReturnFromCreateFolder.KTF) {
                fs.copySync(LocalFromPath, LocalFolderPath);

                LocalReturnData.KTF = true;
            };
        };
    } catch (error) {
        console.log("error : ", error);
    };

    return await LocalReturnData;
};

module.exports = { StartFunc };