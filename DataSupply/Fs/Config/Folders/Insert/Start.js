let CommonToDataFolder = require("./ToDataFolder");
let CommonToDisplayFolder = require("./ToDisplayFolder");
const fs = require('fs-extra');
let CommonAbsolutePath = require("../../../DataPath");
let CommonCheck = require("../Check");

let LocalCommonFuncs = {
    CreateDataFolder: async ({ inToName, inUserPK }) => {
        let LocalReturnData = { KTF: false, DirCreate: "", DataFolder: true };
        let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});

        LocalReturnData.DirCreate = `${LocalDataPath}/${inUserPK}/Data/${inToName}`;

        if (!fs.existsSync(LocalReturnData.DirCreate)) {
            fs.mkdirSync(LocalReturnData.DirCreate, {
                recursive: true
            });

            LocalReturnData.KTF = true;
        };

        return await LocalReturnData;

    },
    CreateConfigFolder: async ({ inToName, inUserPK }) => {
        let LocalReturnData = { KTF: false, DirCreate: "", ConfigFolder: true };
        let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});

        LocalReturnData.DirCreate = `${LocalDataPath}/${inUserPK}/Config/${inToName}`;

        if (!fs.existsSync(LocalReturnData.DirCreate)) {
            fs.mkdirSync(LocalReturnData.DirCreate, {
                recursive: true
            });

            LocalReturnData.KTF = true;
        };

        return await LocalReturnData;
    },
    FillFromTemplateData: {
        StartFunc: async ({ inDestinationDir, inDestinationDataDir }) => {
            let LocalReturnData = { KTF: false, DirCreate: "" };
            let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});

            let LocalSourceDir = `${LocalDataPath}/TemplateData/CreateFolder`;

            try {
                fs.copySync(LocalSourceDir, inDestinationDir);

                const readDirMain = fs.readdirSync(inDestinationDir);

                readDirMain.forEach((dirNext) => {
                    if (fs.lstatSync(inDestinationDir + "/" + dirNext).isDirectory()) {
                        LocalCommonFuncs.FillFromTemplateData.ToDataFolder.ToJson({
                            inDestinationDir,
                            inDestinationDataDir, inFileName: dirNext
                        });
                    };
                });

                LocalReturnData.KTF = true;
            } catch (err) {
                console.error(err)
            };

            return await LocalReturnData;
        },
        ToDataFolder: {
            ToJson: ({ inDestinationDir, inDestinationDataDir, inFileName }) => {
                let LocalDisplayName = "Display.json";
                let LocalDataInside = JSON.parse(fs.readFileSync(`${inDestinationDir}/${inFileName}/${LocalDisplayName}`));
                let LocalObjectToData = {};

                Object.keys(LocalDataInside).forEach(element => {
                    LocalObjectToData[element] = {}
                });

                fs.writeFileSync(`${inDestinationDataDir}/${inFileName}.json`, JSON.stringify(LocalObjectToData));
            }
        }
    }
};

let InsertNew = async ({ inToName, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "" };
    let LocalRetrunFromConfig;
    let LocalDestinationDir;
    let LocalReturnFromTemplate;

    LocalReturnData = await LocalCommonFuncs.CreateDataFolder({ inToName, inUserPK });
    if (LocalReturnData.KTF) {
        LocalRetrunFromConfig = await LocalCommonFuncs.CreateConfigFolder({ inToName, inUserPK });
        if (LocalRetrunFromConfig.KTF) {
            LocalDestinationDir = LocalRetrunFromConfig.DirCreate;

            LocalReturnFromTemplate = await LocalCommonFuncs.FillFromTemplateData.StartFunc({
                inDestinationDir: LocalDestinationDir,
                inDestinationDataDir: LocalReturnData.DirCreate,
                inUserPK, inToName
            });
        };
    };

    return [LocalReturnData, LocalRetrunFromConfig, LocalReturnFromTemplate];
};

let OnlyFolder = async ({ inToName, inUserPK }) => {
    let LocalReturnData = await CommonToDataFolder.CreateDataFolder({ inFolderName: inToName, inUserPK });
    let LocalRetrunFromConfig = await CommonToDisplayFolder.CreateConfigFolder({ inFolderName: inToName, inUserPK });

    return [LocalReturnData, LocalRetrunFromConfig];
};

let CreateIfNotPresent = async ({ inToName, inUserPK }) => {
    let LocalFromCheckDataFolder = CommonCheck.ForExistence({
        inFolderName: inToName,
        inUserPK
    });

    let LocalFromCheckForConfig = CommonCheck.ForConfig({
        inFolderName: inToName,
        inUserPK
    });

    let LocalReturnData;
    let LocalRetrunFromConfig;

    if (LocalFromCheckDataFolder.KTF === false) {
        LocalReturnData = await CommonToDataFolder.CreateDataFolder({ inFolderName: inToName, inUserPK });
        //LocalRetrunFromConfig = await CommonToDisplayFolder.CreateConfigFolder({ inFolderName: inToName, inUserPK });

    };

    if (LocalFromCheckForConfig.KTF === false) {
        //LocalReturnData = await CommonToDataFolder.CreateDataFolder({ inFolderName: inToName, inUserPK });
        LocalRetrunFromConfig = await CommonToDisplayFolder.CreateConfigFolder({ inFolderName: inToName, inUserPK });

    };

    return [LocalReturnData, LocalRetrunFromConfig];
};

let MockFuncOnlyFolder = async ({ inToName, inUserPK }) => {
    return await OnlyFolder({
        inToName, inUserPK
    });
};

// MockFuncOnlyFolder({
//     inToName: "Masters",
//     inUserPK: 1016
// }).then(p => {
//     console.log("P : ", p);
// });

module.exports = { OnlyFolder, InsertNew, CreateIfNotPresent };
