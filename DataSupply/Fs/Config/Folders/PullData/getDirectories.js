const path = require('path');
const fs = require("fs");
const CommonAbsolutePath = require("../../../DataPath");
let CommonInForUiFolder = require("../../../InForUiFolder/FromBs5Json/PullData/RerturnElementsOnly");

let StartFunc = ({ inDataPk }) => {
    let DataPath = require("../../../../Kprivate/DataPath.json");
    let GlobalDataPath = `../../../../../${DataPath.Path}`;

    let LocalDataPath = path.resolve(__dirname, `${GlobalDataPath}/${inDataPk}`);
    //let LocalPath = path.resolve(__dirname, `${GlobalDataPath}/${inUserPK}/Data`);
    let LocalPath = `${LocalDataPath}/Data`;
    //  console.log("LocalPath : ", LocalPath);
    if (fs.existsSync(LocalDataPath)) {
        if (fs.existsSync(LocalPath)) {
            return fs.readdirSync(LocalPath).filter(function (file) {
                return fs.statSync(LocalPath + '/' + file).isDirectory();
            });
        };
    };
};

let AsArrayOfObjects = ({ inDataPk }) => {
    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    let LocalPath = `${GlobalDataPath}/${inDataPk}/Data`;
    let LocalReturnObject = { KTF: false, Folders: {} };

    if (fs.existsSync(LocalPath)) {
        let LocalFoldersArray = fs.readdirSync(LocalPath).filter(function (file) {
            return fs.statSync(LocalPath + '/' + file).isDirectory();
        });

        LocalFoldersArray.forEach(element => {
            LocalReturnObject.Folders[element] = { FolderName: element };
        });

        LocalReturnObject.KTF = true;
        //return LocalFoldersArray;
    };

    return LocalReturnObject;
};

let AsArrayOfObjectsWithDesign = ({ inDataPK }) => {
    let LocalDataPK = inDataPK;
    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    let LocalPath = `${GlobalDataPath}/${LocalDataPK}/Data`;
    let LocalReturnObject = { KTF: false, Folders: {} };
    let LocalFromCommonInForUiFolder = CommonInForUiFolder.StartFunc({ inDataPK: LocalDataPK });

    if (fs.existsSync(LocalPath)) {
        let LocalFoldersArray = fs.readdirSync(LocalPath).filter(function (file) {
            return fs.statSync(LocalPath + '/' + file).isDirectory();
        });

        LocalFoldersArray.forEach(element => {
            LocalReturnObject.Folders[element] = { FolderName: element };
        });

        if (LocalFromCommonInForUiFolder.KTF) {

            Object.entries(LocalReturnObject.Folders).forEach(
                ([key, value]) => {
                    if (key in LocalFromCommonInForUiFolder.JsonData) {
                        value.DisplayName = LocalFromCommonInForUiFolder.JsonData[key].DisplayName;
                        value.MenuClass = LocalFromCommonInForUiFolder.JsonData[key].MenuClass;
                        value.IconClass = LocalFromCommonInForUiFolder.JsonData[key].IconClass;
                    };
                }
            );
        };

        LocalReturnObject.KTF = true;
        //return LocalFoldersArray;
    };

    return LocalReturnObject;
};

// let LocalMockFunc = () => {
//     let LocalData = StartFunc({ inDataPk: 1018 });
//     console.log("LocalData : ", LocalData);
// };

// LocalMockFunc();

module.exports = { StartFunc, AsArrayOfObjects, AsArrayOfObjectsWithDesign };
