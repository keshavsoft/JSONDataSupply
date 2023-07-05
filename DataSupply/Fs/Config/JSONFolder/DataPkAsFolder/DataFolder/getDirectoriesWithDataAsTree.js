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

    fs.readdirSync(LocalDataPath).filter(function (RootFolder) {
        if (fs.statSync(LocalDataPath + '/' + RootFolder).isDirectory()) {
            LocalReturnObject[RootFolder] = {};

            fs.readdirSync(LocalDataPath + '/' + RootFolder).filter(function (FileInFolder) {
                LocalReturnObject[RootFolder][FileInFolder] = {};

                if (fs.statSync(`${LocalDataPath}/${RootFolder}/${FileInFolder}`).isFile()) {
                    LocalReturnObject[RootFolder] = {};

                    let rawdata = fs.readFileSync(`${LocalDataPath}/${RootFolder}/${FileInFolder}`);
                    let student = JSON.parse(rawdata);

                    LocalReturnObject[RootFolder] = student;
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
    if (CommonMockAllow.MockKey === "K91") {
        let PromiseData = StartFunc({ inDataPK: CommonMockAllow.DataPK });
        console.log("PromiseData : ", PromiseData.Masters.Products);
    };
};

module.exports = { StartFunc, AsObject };
