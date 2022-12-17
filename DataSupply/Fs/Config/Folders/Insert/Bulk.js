const fs = require('fs-extra');
let CommonAbsolutePath = require("../../../DataPath");
let CommonFile = require("../Files/Insert/Bulk");

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

let Insert = async ({ inToName, inBody, inUserPK }) => {
    let LocalReturnData = await LocalCommonFuncs.CreateDataFolder({ inToName, inUserPK });
    let LocalRetrunFromConfig = await LocalCommonFuncs.CreateConfigFolder({ inToName, inUserPK });

    if ((LocalReturnData.KTF || LocalReturnData.DataFolder) && (LocalRetrunFromConfig.KTF || LocalRetrunFromConfig.ConfigFolder)) {
        Object.entries(inBody).forEach(
            ([key, value]) => {
                CommonFile.Insert({
                    inFolderName: inToName,
                    inFileNameWithExtension: `${key}.json`,
                    inData: value,
                    inUserPK
                });
            }
        );
    };

    return [LocalReturnData, LocalRetrunFromConfig];
};


let InsertToDataOnly = async ({ inToName, inBody, inUserPK }) => {
    let LocalReturnData = await LocalCommonFuncs.CreateDataFolder({ inToName, inUserPK });

    if ((LocalReturnData.KTF || LocalReturnData.DataFolder)) {
        Object.entries(inBody).forEach(
            ([key, value]) => {
                CommonFile.InsertToDataOnly({
                    inFolderName: inToName,
                    inFileNameWithExtension: `${key}.json`,
                    inData: value,
                    inUserPK
                });
            }
        );
    };

    return LocalReturnData;
};

module.exports = { Insert, InsertToDataOnly };
