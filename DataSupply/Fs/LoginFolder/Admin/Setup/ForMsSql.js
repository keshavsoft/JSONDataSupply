const fs = require("fs-extra");
let CommonAbsolutePath = require("../../../DataPath");
let CommonFromCheck = require("../../../Config/TemplateData/CreateFolder/Check");

class FillFromTemplateData {
    static StartFunc = async ({ inDestinationDir }) => {
        let LocalReturnData = { KTF: false, DirCreate: "" };
        let LocalFromCommonFromCheck = CommonFromCheck.ForExistence();

        if (LocalFromCommonFromCheck.KTF === false) {
            LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
            return LocalReturnData;
        };

        try {
            fs.copySync(LocalFromCommonFromCheck.CreateFolderDirPath, inDestinationDir);

            LocalReturnData.KTF = true;
        } catch (err) {
            console.error(err)
        };

        return await LocalReturnData;
    }
};

let LocalCreateFolder = async ({ inFolderPath }) => {
    let LocalReturnData = { KTF: false, KReason: "" };

    try {
        fs.mkdirSync(inFolderPath, {
            recursive: true
        });

        LocalReturnData.KTF = true;
    } catch (error) {
        console.log("eeeeeeee : ", error);
    };

    return await LocalReturnData;
};

let StartFunc = async ({ inUserPK }) => {
    let LocalReturnData = { KTF: false, KReason: "" };
    let LocalFromTemplate;
    let LocalReturnFromCreateFolder;

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    let LocalFolderPath = `${GlobalDataPath}\\${inUserPK}`

    try {
        if (fs.existsSync(LocalFolderPath)) {
            LocalReturnData.KReason = "Data is already present on the server";
        } else {
            LocalReturnFromCreateFolder = await LocalCreateFolder({ inFolderPath: LocalFolderPath });

            if (LocalReturnFromCreateFolder.KTF) {
                LocalFromTemplate = await FillFromTemplateData.StartFunc({ inDestinationDir: LocalFolderPath });
                
                if (LocalFromTemplate.KTF) {
                    LocalReturnData.KTF = true;
                };
            };
        };
    } catch (error) {
        console.log("error : ", error);
    };

    return await LocalReturnData;
};

module.exports = { StartFunc };