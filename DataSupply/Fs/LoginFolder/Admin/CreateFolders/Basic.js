const fs = require("fs-extra");

let StartFunc = async ({ inFolderPath }) => {
    let LocalReturnData = { KTF: false, KReason: "" };

    try {
        fs.mkdirSync(inFolderPath, { recursive: true });
        fs.mkdirSync(`${inFolderPath}/Data`, { recursive: true });
        fs.mkdirSync(`${inFolderPath}/Config`, { recursive: true });
        fs.mkdirSync(`${inFolderPath}/Admin`, { recursive: true });
        
        LocalReturnData.KTF = true;
    } catch (error) {
        console.log("eeeeeeee : ", error);
    };

    return await LocalReturnData;
};

module.exports = {
    StartFunc
}