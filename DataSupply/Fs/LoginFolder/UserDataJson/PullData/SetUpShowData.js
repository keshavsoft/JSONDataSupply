let fs = require("fs");
let CommonCheck = require("../Check/ForFile");

let StartFunc = async () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromCheck = await CommonCheck.StartFunc();

    LocalReturnData = { ...LocalFromCheck };
    LocalReturnData.KTF = false;
    let localJSONpath = LocalReturnData.GlobalDataPath;

    if (LocalFromCheck.KTF) {
        // consolse.log("LocalReturnData.FilePath", LocalReturnData.FilePath);
        LocalReturnData.FilePath = LocalFromCheck.FilePath;
        LocalReturnData.KTF = true;

        let LocalJsonData = fs.readFileSync(LocalFromCheck.FilePath);
        LocalJsonData = JSON.parse(LocalJsonData);
        let localUsersKeys = Object.values(LocalJsonData);

        const subdirectories = fs.readdirSync(localJSONpath, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(directory => directory.name);

        const uncommonObjects = localUsersKeys.map(obj => {
            const filteredEntries = Object.entries(obj).filter(([key]) => !subdirectories.includes(key));

            return Object.fromEntries(filteredEntries);
        });

        LocalReturnData.JsonData = uncommonObjects.reduce((accumulator, currentObject) => {
            return { ...accumulator, ...currentObject };
        }, {});

    } else {
        LocalReturnData.KReason = "Json file not found";
    };
    return await LocalReturnData;
};

module.exports = { StartFunc };