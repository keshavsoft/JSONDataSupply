const fs = require('fs-extra');
let CommonCheck = require("../Check");
let path = require("path");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inContent, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", ConfigFolder: true };

    if (inContent !== undefined) {
        try {

            let LocalFromCheck = CommonCheck.InConfig({
                inFolderName,
                inFileNameOnly: path.basename(inFileNameWithExtension, '.json'), inUserPK
            });

            if (LocalFromCheck.KTF) {
                fs.writeFileSync(LocalFromCheck.ReturnDataPath, JSON.stringify(inContent));

                LocalReturnData.DirCreate = LocalFromCheck.DirPath;
                LocalReturnData.FilePath = LocalFromCheck.FilePath;
                LocalReturnData.ReturnDataPath = LocalFromCheck.ReturnDataPath;
                LocalReturnData.KTF = true;
            } else {
                LocalReturnData.FilePath = LocalFromCheck.FilePath;
                LocalReturnData.AlreadyPresent = true;
            };
        } catch (error) {
            console.log("error : ", error);
        };
    };

    return await LocalReturnData;
};

module.exports = {
    StartFunc
};
