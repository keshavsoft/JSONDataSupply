let path = require("path");
let CommonNewItems = require("../../../../../Config/Folders/Files/Items/PullData/FromDisplayJson/HigherOrderFuncs/FromTableColumns");
let CommonFolders = require("../../../../../Config/Folders/PullData/getDirectories");
let CommonFiles = require("../../../../../Config/Folders/Files/PullData/ListFiles");

class FuncsWithColumns {
    static AsTreeWithColumns = async ({ inDataPk }) => {
        let LocalFoldersData = CommonFolders.StartFunc({ inDataPk });
        let LocalFolderObject;
        let LocalReturnObject = {
            Folders: {}
        };

        await Promise.all(LocalFoldersData.map(async LoopFolderName => {
            LocalReturnObject.Folders[LoopFolderName] = {
                FolderName: LoopFolderName,
                Files: await this.PullFiles({
                    inFilesArray: CommonFiles.StartFunc({ inFolderName: LoopFolderName, inDataPk }),
                    inFolderName: LoopFolderName,
                    inUserPK: inDataPk
                })
            };

            return LocalFolderObject;
        }));

        return await LocalReturnObject;
    };

    static PullFiles = async ({ inFolderName, inFilesArray, inUserPK }) => {
        let LocalReturnObject = {};
        await Promise.all(inFilesArray.map(async LoopFileName => {
            LocalReturnObject[path.parse(LoopFileName).name] = {
                FileName: LoopFileName,
                Items: await CommonNewItems.StartFunc({
                    inFolderName,
                    inFileNameWithExtension: LoopFileName,
                    inUserPK,
                    inFuncToRun: this.HigherOrderFuncToRun
                })
            };
        }));
        return await LocalReturnObject;
    };

    static HigherOrderFuncToRun = ({ inData }) => {
        let LocalReturnObject = {};

        inData.forEach(LoopItem => {
            LocalReturnObject[LoopItem.DataAttribute] = {
                DataAttribute: LoopItem.DataAttribute,
                DisplayName: LoopItem.DisplayName,
                DefaultValue: LoopItem.DefaultValue,
                TextAlign: LoopItem.TextAlign,
            };
        });
        return LocalReturnObject;
    };
};

module.exports = { AsTreeWithColumns: FuncsWithColumns.AsTreeWithColumns };