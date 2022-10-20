let fs = require("fs");
let CommonFolder = require("../../Check/InConfigFolder/Check");

let StartFunc = async ({ inFolderName, inFileNameOnly, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", CreatedLog: {} };
    let LocalFileName = "PrintFiles.json";

    try {
        let LocalFolderInfo = CommonFolder.ForExistence({ inFolderName, inUserPK });
        LocalReturnData.DirPath = LocalFolderInfo.DirPath;
        LocalReturnData.FolderPath = `${LocalReturnData.DirPath}/${inFileNameOnly}`;
        LocalReturnData.PrintFilesJsonPath = `${LocalReturnData.FolderPath}/${LocalFileName}`;

        if (LocalFolderInfo.KTF) {
            if (fs.existsSync(LocalReturnData.FolderPath)) {
                if (fs.statSync(LocalReturnData.FolderPath).isDirectory()) {
                    LocalReturnData.KTF = true;
                };
            };
        };
    } catch (error) {
        console.log("error in datasupply : ", error);
    };

    return await LocalReturnData;
};
let MockFuncFromFolderFile = async () => {
    return await StartFunc({
        inFolderName: "Transactions",
        inFileNameOnly: "General Payments",
        inUserPK: 1018
    });
};

//MockFuncFromFolderFile().then(p => { console.log("p:", p) })
module.exports = { StartFunc };