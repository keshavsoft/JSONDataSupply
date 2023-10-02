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
            fs.readdirSync(`${LocalDataPath}/${LoopFolder}`).filter(LoopFileAsFolder => {
                if (fs.statSync(`${LocalDataPath}/${LoopFolder}/${LoopFileAsFolder}`).isDirectory()) {
                    let LoopInsideDisplayJsonFile = `${LocalDataPath}/${LoopFolder}/${LoopFileAsFolder}/Display.json`;

                    if (fs.existsSync(LoopInsideDisplayJsonFile)) {
                        let LoopInsideJsonData = JSON.parse(fs.readFileSync(LoopInsideDisplayJsonFile));

                        Object.entries(LoopInsideJsonData).forEach(LoopItem => {
                            Object.entries(LoopItem[1]).forEach(LoopScreen => {
                                let LoopScreenValue = LoopScreen[1];

                                LocalArray.push(...LoopScreenValue.TableColumns.map(element => {
                                    return {
                                        DataConfig: {
                                            FolderName: LoopFolder,
                                            FileNameAsFolder: LoopFileAsFolder,
                                            ItemName: LoopItem[0],
                                            ScreenName: LoopScreen[0],
                                            DataAttribute: element.DataAttribute
                                        },
                                        ColumnData: element
                                    }
                                }));

                                // LocalArray.push({
                                //     DataConfig: {
                                //         FolderName: LoopFolder,
                                //         FileNameAsFolder: LoopFileAsFolder,
                                //         ItemName: LoopItem[0],
                                //         ScreenName: LoopScreen[0],
                                //         DataAttribute: LoopScreenValue.DataAttribute
                                //     },
                                //     ColumnData: LoopScreenValue.TableColumns
                                // });

                                // LocalArray.push(...LoopScreenValue.TableColumns)
                            });
                        });
                    };
                };
            });
        };
    });

    return LocalArray;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'SSN') {
        let LocalData = StartFunc({ inDataPK: CommonMock.DataPK });
        console.log("LocalData", LocalData[0]);
    };
};

module.exports = { StartFunc };
