const fs = require("fs-extra");
let CommonCheck = require("../../Check");
let CommonFirmObject = {
    Firm: {
        FirmName: "",
        FromDate: "01-04-2021",
        ToDate: "31-03-2022",
        Config: {
            Ui: {
                Login: {
                    "RedirectPage": "/JSONApi/Html/UserData/Menu/AsCards/Files.html"
                }
            }
        }
    }
};

let StartFunc = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, KReason: "" };
    let LocalFromCommonCheck = CommonCheck.ForExistence({ inDataPK });

    if (LocalFromCommonCheck.KTF) {
        LocalReturnData.KReason = `${inDataPK} : folder is already present...`;

        return await LocalReturnData;
    };

    LocalReturnData.DataPKPath = LocalFromCommonCheck.DataPKPath;

    try {
        fs.mkdirSync(LocalReturnData.DataPKPath, { recursive: true });
        fs.mkdirSync(`${LocalReturnData.DataPKPath}/Data`, { recursive: true });
        fs.mkdirSync(`${LocalReturnData.DataPKPath}/Config`, { recursive: true });
        fs.mkdirSync(`${LocalReturnData.DataPKPath}/Admin`, { recursive: true });
        fs.mkdirSync(`${LocalReturnData.DataPKPath}/Reports`, { recursive: true });
        fs.writeFileSync(`${LocalReturnData.DataPKPath}/FirmDetails.json`, JSON.stringify(CommonFirmObject));

        LocalReturnData.KTF = true;
    } catch (error) {
        console.log("eeeeeeee : ", error);
    };

    return await LocalReturnData;
};

// StartFunc({ inDataPK: 1016 }).then(p => {
//     console.log("StartFunc : ", p);
// });

module.exports = {
    StartFunc
}