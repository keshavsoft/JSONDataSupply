let CommonCheck = require("../Check");
let fs = require("fs");

let StartFunc = async ({ inUserPK }) => {
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFilePath;

        LocalDataFromCommonCreate = await CommonCheck.ForExistence({ inDataPK: inUserPK });

        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.FilePath
            LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
            LocalReturnData = JSON.parse(LocalDataFromJSON);
            Object.freeze(LocalReturnData);
        };
        return await LocalReturnData;
    };
};

let RedirectPage = async ({ inDataPk }) => {
    if (inDataPk > 0) {
        let LocalReturnData = "";
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFilePath;
        let LocalOriginalData;

        LocalDataFromCommonCreate = await CommonCheck.ForExistence({ inDataPK: inDataPk });
        console.log("LocalDataFromCommonCreate", LocalDataFromCommonCreate);
        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.FilePath
            LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
            LocalOriginalData = JSON.parse(LocalDataFromJSON);

            if ("Config" in LocalOriginalData.Firm) {
                LocalReturnData = LocalOriginalData.Firm.Config.Ui.Login.RedirectPage;
            };
        };

        return await LocalReturnData;
    };
};

let RedirectPageKTF = async ({ inDataPk }) => {
    let LocalReturnObject = { KTF: false, DirPath: "", CreatedLog: {} };

    if (inDataPk > 0) {
        let LocalReturnData = "";
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFilePath;
        let LocalOriginalData;

        LocalDataFromCommonCreate = await CommonCheck.ForExistence({ inDataPK: inDataPk });

        if (LocalDataFromCommonCreate.KTF === false) {
            LocalReturnObject.KReason = LocalDataFromCommonCreate.KReason;

            return await LocalReturnObject;
        };

        LocalFilePath = LocalDataFromCommonCreate.FilePath
        LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
        LocalOriginalData = JSON.parse(LocalDataFromJSON);

        if ("Config" in LocalOriginalData.Firm) {
            LocalReturnObject.RedirectPage = LocalOriginalData.Firm.Config.Ui.Login.RedirectPage;
        };
        LocalReturnObject.KTF = true;
        return await LocalReturnObject;
    };
};

module.exports = {
    StartFunc,
    RedirectPage,
    RedirectPageKTF
};