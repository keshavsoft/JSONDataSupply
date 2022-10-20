let CommonConfigCheck = require("../../DefultFileNames/Config/Check");
let CommonDisplayInsert = require("../../DefultFileNames/Display/Insert");

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
    ToDisplay: async ({ inFolderName, inFileName, inDataToInsert, inUserPK }) => {
        let LocalReturnData = { KTF: false, LocalCreateItem: "" };
        let LocalFromInsert;
        let LocalFromCheck;

        LocalFromCheck = CommonConfigCheck.ForFolder({ inFolderName, inFileName, inUserPK });

        if (LocalFromCheck.KTF === false) {
            LocalFromInsert = CommonDisplayInsert.FolderAndFile({ inFolderName, inFileName, inDataToInsert, inUserPK });

            if (LocalFromInsert.KTF) {
                LocalReturnData.KTF = true;
            };
        };

        return await LocalReturnData;
    }
};

let Insert = async ({ inFolderName, inFileName, inDataForConfig, inUserPK }) => {
    let LocalFromConfig = await CommonFuns.ToDisplay({
        inFolderName, inFileName, inDataToInsert: inDataForConfig,
        inUserPK
    });

    return await LocalFromConfig;
};

module.exports = { Insert };
