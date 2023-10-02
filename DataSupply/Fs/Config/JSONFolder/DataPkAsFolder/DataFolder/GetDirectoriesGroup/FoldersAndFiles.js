const fs = require("fs");
let CommonFromCheck = require("../Check");

let CommonMock = require("../../../../../../MockAllow.json");

let StartFunc = ({ inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalArray = [];
    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({ inDataPK: LocalDataPK });

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalArray;
    };
    let LocalDataPath = `${LocalFromCommonFromCheck.DirPath}`;

    fs.readdirSync(LocalDataPath).filter(LoopFolder => {
        if (fs.statSync(`${LocalDataPath}/${LoopFolder}`).isDirectory()) {
            fs.readdirSync(`${LocalDataPath}/${LoopFolder}`).filter(LoopFile => {
                if (LoopFile.toLowerCase().endsWith(".json")) {
                    let LoopInsideJsonData = JSON.parse(fs.readFileSync(`${LocalDataPath}/${LoopFolder}/${LoopFile}`));

                    Object.entries(LoopInsideJsonData).forEach(element => {
                        Object.entries(element[1]).forEach(LoopItem => {
                            LocalArray.push({
                                DataConfig: {
                                    FolderName: LoopFolder,
                                    FileName: LoopFile,
                                    ItemName: element[0],
                                    pk: LoopItem[0]
                                },
                                Data: { ...LoopItem[1], pk: LoopItem[0] }
                            });
                        });
                    });
                };
            });
        };
    });

    return LocalArray;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'SSN') {
        let LocalData = StartFunc({ inDataPK: CommonMock.DataPK });
        console.log("LocalData", LocalData, LocalData[0], LocalData[1], LocalData[6600]);
    };
};


module.exports = { StartFunc };
