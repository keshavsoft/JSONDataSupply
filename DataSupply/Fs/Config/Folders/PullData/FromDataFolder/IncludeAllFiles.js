//let CommonCheck = require("../../Check");
let CommonFromFilesAsArray = require("./FilesAsArray");
let CommonFromDataFolder = require("../../Files/PullData/FromDataFolder/FromFolderAndFile");

let fs = require("fs");

let AsArray = async ({ inFolderName, inDataPK }) => {
    let LocalReturnData = { KTF: false, KResult: [], ReturnArray: [] };
    let LocalDataPK = inDataPK;

    if (LocalDataPK > 0) {
        let LocalFromFiles;
        let LocalFolderName = inFolderName;

        LocalFromFiles = CommonFromFilesAsArray.StartFunc({
            inFolderName: LocalFolderName,
            inDataPK: LocalDataPK
        });

        if (LocalFromFiles.KTF) {

            let LocalDataArray = await Promise.all(LocalFromFiles.KResult.map(async LoopFileName => {
                let LoopInsideData = JSON.parse(fs.readFileSync(`${LocalFromFiles.DirPath}/${LoopFileName}`));
                let LoopInsideDataAsArray = [];
                Object.values(LoopInsideData).forEach(element => {
                    LoopInsideDataAsArray = [...LoopInsideDataAsArray, ...Object.values(element)];
                });

                return LoopInsideDataAsArray;
            }));

            LocalDataArray.forEach(element => {
                LocalReturnData.ReturnArray = [...LocalReturnData.ReturnArray, ...element];
            });

            LocalReturnData.KTF = true;
        };

        return await LocalReturnData;
    };
};

let AsArrayWithFileFilters = async ({ inFolderName, inDataPK, inConsiderFilesArray }) => {
    let LocalReturnData = { KTF: false, KResult: [], ReturnArray: [] };
    let LocalDataPK = inDataPK;
    let LocalConsiderFilesArray = inConsiderFilesArray;

    if (LocalDataPK > 0) {
        let LocalFromFiles;
        let LocalFolderName = inFolderName;

        LocalFromFiles = CommonFromFilesAsArray.StartFunc({
            inFolderName: LocalFolderName,
            inDataPK: LocalDataPK
        });

        if (LocalFromFiles.KTF) {
            let LocalDataArray = await Promise.all(LocalFromFiles.KResult.map(async LoopFileName => {
                let LoopInsideDataAsArray = [];

                if (LocalConsiderFilesArray.includes(LoopFileName)) {
                    let LoopInsideData = JSON.parse(fs.readFileSync(`${LocalFromFiles.DirPath}/${LoopFileName}`));

                    Object.values(LoopInsideData).forEach(element => {
                        LoopInsideDataAsArray = [...LoopInsideDataAsArray, ...Object.values(element)];
                    });
                };

                return LoopInsideDataAsArray;
            }));

            LocalDataArray.forEach(element => {
                LocalReturnData.ReturnArray = [...LocalReturnData.ReturnArray, ...element];
            });

            LocalReturnData.KTF = true;
        };

        return await LocalReturnData;
    };
};

let LocalMockFunc = async () => {
    let LocalData = await AsArray({
        inFolderName: "Transactions",
        inDataPK: 1024
    });
};

//LocalMockFunc().then(p => { p })

module.exports = {
    AsArray,
    AsArrayWithFileFilters
};