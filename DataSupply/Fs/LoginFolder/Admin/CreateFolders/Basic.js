const fs = require("fs-extra");
let CommonFirmObject = require("../../../../Fix/Json/FirmDetails.json");

let StartFunc = async ({ inFolderPath }) => {
    let LocalReturnData = { KTF: false, KReason: "", KData: {} };

    try {
        fs.mkdirSync(inFolderPath, { recursive: true });
        fs.mkdirSync(`${inFolderPath}/Data`, { recursive: true });
        fs.mkdirSync(`${inFolderPath}/Config`, { recursive: true });
        fs.mkdirSync(`${inFolderPath}/Admin`, { recursive: true });
        fs.writeFileSync(`${inFolderPath}/Admin/Preload.json`, JSON.stringify(LocalReturnData.KData));
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