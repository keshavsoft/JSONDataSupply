const fs = require("fs");
let CommonFromCheck = require("./Check");
let CommonMockAllow = require("../../../../../MockAllow.json");
let CommonFromUserFolder = require("./UserFolder/getDirectoriesWithCheckAndDelete");

let StartFunc = ({ inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistenceOfDataFolder({ inDataPK: LocalDataPK });

    if (LocalFromCommonFromCheck.KTF === false) {
        return [];
    };

    let LocalDataPath = `${LocalFromCommonFromCheck.DirPath}`;
    let LocalReturnObject = {};

    fs.readdirSync(LocalDataPath).forEach((RootFolder) => {
        if (fs.statSync(LocalDataPath + '/' + RootFolder).isDirectory()) {
            LocalReturnObject[RootFolder] = {};

            fs.readdirSync(LocalDataPath + '/' + RootFolder).forEach((FileInFolder) => {
                LocalReturnObject[RootFolder][FileInFolder] = {};

                if (fs.statSync(`${LocalDataPath}/${RootFolder}/${FileInFolder}`).isFile()) {
                    let rawdata = fs.readFileSync(`${LocalDataPath}/${RootFolder}/${FileInFolder}`);
                    let student = JSON.parse(rawdata);

                    LocalReturnObject[RootFolder][FileInFolder] = student;
                };
            });
        };
    });

    return LocalReturnObject;
};

let AsObject = async ({ inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = {};

    let LocalArray = StartFunc({ inDataPK: LocalDataPK });

    LocalArray.forEach(async (file) => {
        let LoopInsideFile = await CommonFromUserFolder.AsObjects({
            inFolderName: file,
            inDataPK: LocalDataPK
        });

        LocalReturnObject[file] = LoopInsideFile;
        // return await LoopInsideFile;
    });

    return await LocalReturnObject;
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "K05") {
        let PromiseData = StartFunc({ inDataPK: CommonMockAllow.DataPK });
        console.log("PromiseData : ", Object.keys(PromiseData.Masters), Object.keys(PromiseData), Object.keys(PromiseData.Trans));
    };
};

module.exports = { StartFunc, AsObject };
