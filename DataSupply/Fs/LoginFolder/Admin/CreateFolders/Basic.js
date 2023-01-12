const fs = require("fs-extra");

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

let StartFunc = async ({ inFolderPath }) => {
    let LocalReturnData = { KTF: false, KReason: "" };

    try {
        fs.mkdirSync(inFolderPath, { recursive: true });
        fs.mkdirSync(`${inFolderPath}/Data`, { recursive: true });
        fs.mkdirSync(`${inFolderPath}/Config`, { recursive: true });
        fs.mkdirSync(`${inFolderPath}/Admin`, { recursive: true });
        fs.writeFileSync(`${inFolderPath}/FirmDetails.json`, JSON.stringify(CommonFirmObject));

        
        LocalReturnData.KTF = true;
    } catch (error) {
        console.log("eeeeeeee : ", error);
    };

    return await LocalReturnData;
};

module.exports = {
    StartFunc
}