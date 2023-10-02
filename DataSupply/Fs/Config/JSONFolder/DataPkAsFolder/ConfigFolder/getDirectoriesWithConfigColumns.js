let CommonFromUserFolder = require("./UserFolder/getDirectoriesWithCheckAndDelete");
let CommonMockAllow = require("../../../../../MockAllow.json");
let CommonFromCheck = require("./Check");
const fs = require("fs");

let StartFunc = ({ inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({ inDataPK: LocalDataPK });

    if (LocalFromCommonFromCheck.KTF === false) {
        return [];
    };
    let LocalDataPath = `${LocalFromCommonFromCheck.DirPath}`;

    return fs.readdirSync(LocalDataPath).filter(function (file) {
        return fs.statSync(LocalDataPath + '/' + file).isDirectory();
    });
};

let ServerSideAsArray = async ({ inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = {};
    LocalReturnObject.Folders = {};

    let LocalArray = StartFunc({ inDataPK: LocalDataPK });

    const result = await Promise.all(LocalArray.map(async (file) => {
        let LoopInsideFile = await CommonFromUserFolder.AsObjects({
            inFolderName: file,
            inDataPK: LocalDataPK
        });

        return await {
            FolderName: file,
            Files: LoopInsideFile
        };
    }));

    let k3 = result.map((element) => {
        // console.log("element : ", element);
        // element.Files.Items.Screens.TableColumnsObject.DataConfig = {};
        // element.Files.Items.Screens.TableColumnsObject.DataConfig.FolderName = element;

        return element.Files;
    });

    let k4 = k3.map((element) => {
        return Object.values(element);
    });

    let k5 = k4.flat(1).map((element) => {
        return element.Items;
    });

    let k6 = k5.map((element) => {
        return Object.values(element);
    });

    let k7 = k6.flat(1).map((element) => {
        return element.Screens;
    });

    let k8 = k7.map((element) => {
        return Object.values(element);
    });

    let k9 = k8.flat(1).map((element) => {
        return element.TableColumnsObject;
    });

    let k10 = k9.map((element) => {
        return Object.values(element);
    });

    let k11 = k10.flat(1).map((element) => {
        return {
            DataConfig: { ...element.DataConfig },
            ToDeleteConfig: { ...element.ServerSide.DefaultShowData }
        };
    });

    return await k11;
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "") {
        ServerSideAsArray({ inDataPK: CommonMockAllow.DataPK }).then(PromiseData => {
            console.log("PromiseData : ", PromiseData);
        });
    };
};

// LocalMockFunc().then();

module.exports = { ServerSideAsArray };
