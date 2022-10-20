let CommonCheck = require("../Check");
let CommonInsert = require("../Insert");

let CommonFuns = {
    ToDataJson: async ({ inFolderName, inFileName, inDataToInsert, inUserPK }) => {
        let LocalReturnData = { KTF: false, LocalCreateItem: "", FilePresent: false };
        let LocalFromCheck;
        let LocalFromInsert;

        LocalFromCheck = CommonCheck.ForFile({
            inFolderName, inFileNameWithExtension: `${inFileName}.json`,
            inUserPK
        });

        if (LocalFromCheck.KTF === false) {
            LocalFromInsert = await CommonInsert.WithData({ inFolderName, inFileName, inDataToInsert, inUserPK });

            if (LocalFromInsert.KTF) {
                LocalReturnData.KTF = true;
            }
        } else {
            LocalReturnData.FilePresent = true;
        };

        return await LocalReturnData;
    }
};

let Insert = async ({ inFolderName, inFileName, inDataToInsert, inUserPK }) => {
    let LocalFromData = await CommonFuns.ToDataJson({
        inFolderName, inFileName,
        inDataToInsert,
        inUserPK
    });

    return await LocalFromData;
};

module.exports = { Insert };
