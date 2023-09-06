let CommonFromUserFileAsFolder = require("./UserJsonFile/AsTreeWithCheckAndDelete");
const fs = require("fs");
let CommonFromCheck = require("./Check");
let path = require("path");

let CommonMock = require("../../../../../../MockAllow.json");

let AsArray = async ({ inFolderName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalFolderName = inFolderName;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inFolderName: LocalFolderName,
        inDataPK: LocalDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        return [];
    };

    let LocalDataPath = LocalFromCommonFromCheck.FolderPath;

    return fs.readdirSync(LocalDataPath).map((file) => {
        return file;
    });
};

let AsObjects = async ({ inFolderName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalFolderName = inFolderName;
    let LocalReturnObject = {};

    let LocalArray = await AsArray({
        inFolderName: LocalFolderName,
        inDataPK: LocalDataPK
    });

    const result = await Promise.all(LocalArray.map(async (file) => {
        let LoopInsideFile = await CommonFromUserFileAsFolder.AsObjects({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(file).name,
            inDataPK: LocalDataPK
        });

        if (LoopInsideFile.KTF) {
            return await {
                FileName: path.parse(file).name,
                Items: LoopInsideFile.JsonData
            };
            //return await LoopInsideFile.JsonData;
        } else {
            return await undefined;
        };
    }));

    let LocalRemoveUndefined = result.filter(element => element !== undefined);

    LocalRemoveUndefined.forEach(element => {
        //  console.log("element --------: ", element);

        LocalReturnObject[element.FileName] = element;
    });

    return await LocalReturnObject;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K6') {
        let LocalMockData = require('./AsObjects.json');

        AsObjects({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};

module.exports = { AsObjects };
