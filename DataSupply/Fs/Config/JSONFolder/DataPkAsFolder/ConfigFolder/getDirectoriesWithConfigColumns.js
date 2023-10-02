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

let AsObject = async ({ inDataPK }) => {
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

    result.forEach(element => {
        LocalReturnObject.Folders[element.FolderName] = element;
    });

    return await LocalReturnObject;
};

if (CommonMockAllow.AllowMock) {
    if (CommonMockAllow.MockKey === "K911") {
        AsObject({ inDataPK: CommonMockAllow.DataPK }).then(PromiseData => {
            let k1 = Object.entries(PromiseData.Folders)
            let k2 = k1.map((element) => {
                return element[1]
            })
            let k3 = k2.map((element) => {
                return element.Files
            })
            let k4 = Object.entries(k3).map((element) => {
                return element[1]
            });

            let k5 = k4.map((element) => {
                return element.Items
            })

            console.log("PromiseData : ", k5);
        });
    };
};

// LocalMockFunc().then();

module.exports = { AsObject };
