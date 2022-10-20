let CommonCheckFolder = require("./CheckFolder");
let fs = require("fs");

let ForPreLoadFile = ({ inUserPK }) => {
    let LocalReturnData = { KTF: false, FilePath: "", CreatedLog: {}, KReason: "" };
    let LocalReturnDataFromFolder = CommonCheckFolder.ForAdminFolder({ inUserPK });

    if (LocalReturnDataFromFolder.KTF) {
        LocalReturnData.FilePath = `${LocalReturnDataFromFolder.DirPath}/Preload.json`;

        if (fs.existsSync(LocalReturnData.FilePath)) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason += "preload file not found!";
        };
    } else {
        LocalReturnData.KReason = LocalReturnDataFromFolder.KReason;
    };

    return LocalReturnData;
};

module.exports = { ForPreLoadFile };