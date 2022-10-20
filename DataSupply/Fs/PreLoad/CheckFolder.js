let fs = require("fs");
let CommonAbsolutePath = require("../DataPath");

let ForAdminFolder = ({ inUserPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {}, KReason: "" };
    let LocalPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    let LocalDataPath = `${LocalPath}/${inUserPK}/Admin`;

    if (fs.existsSync(LocalDataPath)) {

        if (fs.statSync(LocalDataPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "Admin folder not found!";
        };

    };

    LocalReturnData.DirPath = LocalDataPath;

    return LocalReturnData;
};

module.exports = { ForAdminFolder };