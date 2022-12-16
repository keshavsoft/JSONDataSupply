let CommonFromAdminFolder = require("../../../AdminFolder/Check");
let CommonFromCheck = require("./Check");

let fs = require("fs-extra");

let StartFunc = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromAdminFolder = CommonFromAdminFolder.FolderIsEmpty({ inDataPK })

    if (LocalFromCommonFromAdminFolder) {
        let LocalFrom = CommonFromCheck.ReturnDirectories();

        if (LocalFrom.KTF === false) {
            LocalReturnData.KReason = LocalFrom.KReason;

            return await LocalReturnData;
        };
        
        if (LocalFrom.DirectoriesArray.includes("Admin")) {
            fs.copySync(`${LocalFrom.TemplateDataPath}/Admin`, LocalFromCommonFromAdminFolder.AdminPath);
            LocalReturnData.KTF = true;
        };
    };

    return await LocalReturnData;
};

// StartFunc({ inDataPK: 1016 }).then(p => {

//     console.log("FromStartFunc : ", p);

// });

module.exports = { StartFunc };
