let path = require("path");

let CommonConfigCheck = require("../../DefultFileNames/Config/Check");
let CommonReturnDataInsert = require("../../DefultFileNames/ReturnData/Insert");

let FChange = ({ inObjToChange, inObjWithValues }) => {
    Object.entries(inObjToChange).forEach(
        ([key, value]) => {
            if (key in inObjWithValues) {
                if (typeof value === "object") {
                    FChange({
                        inObjToChange: inObjToChange[key],
                        inObjWithValues: inObjWithValues[key]
                    });
                } else {
                    inObjToChange[key] = inObjWithValues[key];
                };

            };
        });
};

let CommonFuns = {
    ToReturnData: async ({ inFolderName, inFileName, inDataToInsert, inUserPK }) => {
        let LocalReturnData = { KTF: false, LocalCreateItem: "" };
        let LocalFromInsert;
        let LocalFromCheck;

        LocalFromCheck = CommonConfigCheck.ForFolder({ inFolderName, inFileName, inUserPK });

        if (LocalFromCheck.KTF === false) {
            LocalFromInsert = CommonReturnDataInsert.FolderAndFile({ inFolderName, inFileName, inDataToInsert, inUserPK });

            if (LocalFromInsert.KTF) {
                LocalReturnData.KTF = true;
            };
        } else {
            LocalFromInsert = CommonReturnDataInsert.FileOnly({ inFolderName, inFileName, inDataToInsert, inUserPK });

            if (LocalFromInsert.KTF) {
                LocalReturnData.KTF = true;
            };
        }

        return await LocalReturnData;
    }
};

let Insert = async ({ inFolderName, inFileName, inDataToInsert, inUserPK }) => {
    let LocalFromConfig = await CommonFuns.ToReturnData({
        inFolderName, inFileName, inDataToInsert,
        inUserPK
    });

    return await LocalFromConfig;
};

module.exports = { Insert };
