let fs = require("fs");

let CommonFromFolderCheck = require("../../../Check");
let CommonFileCheck = require("../../Check/InDataFolder")

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", CreatedLog: {}, AlreadyPresent: false };
    let LocalFromFolder;
    let LocalFromFile;

    try {
        LocalFromFolder = await CommonFromFolderCheck.ForExistenceElseCreate({ inFolderName, inUserPK });
       // console.log("3333333333333 : ", LocalFromFolder);
        if (LocalFromFolder.KTF) {
            LocalFromFile = await CommonFileCheck.StartFunc({ inFolderName, inFileNameWithExtension, inUserPK });

            fs.writeFileSync(LocalFromFile.FilePath, JSON.stringify({}));
            LocalReturnData.DirPath = LocalFromFile.DirPath;
            LocalReturnData.FilePath = LocalFromFile.FilePath
            LocalReturnData.KTF = true;
        } else {
            if (LocalFromFolder.AlreadyPresent) {
                LocalFromFile = await CommonFileCheck.StartFunc({ inFolderName, inFileNameWithExtension, inUserPK });
                //      console.log("44444444 : ", await LocalFromFile);
                if (LocalFromFile.KTF === false) {
                    fs.writeFileSync(LocalFromFile.FilePath, JSON.stringify({}));
                    LocalReturnData.DirPath = LocalFromFile.DirPath;
                    LocalReturnData.FilePath = LocalFromFile.FilePath
                    LocalReturnData.KTF = true;
                } else {
                    LocalReturnData.AlreadyPresent = true;
                };
            } else {
                LocalReturnData.KReason = "From folder";
            };
        };
    } catch (error) {
        LocalReturnData.KError = error;
    };
    return await LocalReturnData;
};

module.exports = { StartFunc };