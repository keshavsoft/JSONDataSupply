let path = require("path");
//let CommonFolders = require("../../../../../Folders/Show");
//let CommonFiles = require("../../../../../Files/PullData");
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

        // LocalFoldersData.forEach(LoopFolderName => {
        //     LocalReturnObject.Folders[LoopFolderName] = {
        //         FolderName: LoopFolderName,
        //         Files: this.PullFiles({
        //             inFilesArray: CommonFiles.StartFunc({ inFolderName: LoopFolderName, inDataPk }),
        //             inFolderName: LoopFolderName,
        //             inUserPK: inDataPk
        //         })
        //     };

        //     return LocalFolderObject;
        // });


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
        console.log("inUserPK : ", inUserPK);
        // inFilesArray.forEach(LoopFileName => {
        //     LocalReturnObject[path.parse(LoopFileName).name] = {
        //         FileName: LoopFileName,
        //         Items: CommonNewItems.StartFunc({
        //             inFolderName,
        //             inFileNameWithExtension: LoopFileName,
        //             inUserPK,
        //             inFuncToRun: this.HigherOrderFuncToRun
        //         })
        //     };
        // });

        // inFilesArray.forEach(LoopFileName => {
        //     LocalReturnObject[path.parse(LoopFileName).name] = {
        //         FileName: LoopFileName,
        //         Items: CommonNewItems.StartFunc({
        //             inFolderName,
        //             inFileNameWithExtension: LoopFileName,
        //             inUserPK,
        //             inFuncToRun: this.HigherOrderFuncToRun
        //         })
        //     };
        // });

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

        // LocalReturnData = await Promise.all(LocalFilesArray.map(async (LoopFileName, LoopIndex) => {
        //     let LocalLoopObject = {};
        //     LocalLoopObject.FileName = LoopFileName;
        //     LocalLoopObject.FileNameHtmlId = `File${LoopIndex}`;

        //     LocalJsonConfig = {
        //         inFolderName,
        //         inJsonFileName: LoopFileName
        //     };

        //     let LocalLoopItems = await CommonItems.AsTree({
        //         inJsonConfig: LocalJsonConfig,
        //         inDataPk
        //     });

        //     LocalLoopObject.Items = LocalLoopItems

        //     LocalReturnObject[LocalLoopObject.FileNameHtmlId] = LocalLoopObject;
        // }));

        return await LocalReturnObject;
    };

    static HigherOrderFuncToRun = ({ inData }) => {
        let LocalReturnObject = {};

        inData.forEach(LoopItem => {
            LocalReturnObject[LoopItem.DataAttribute] = {
                DataAttribute: LoopItem.DataAttribute,
                DisplayName: LoopItem.DisplayName,
                ShowInTable: LoopItem.ShowInTable,
                Insert: LoopItem.Insert,
                CreateNew: LoopItem.CreateNew,
                IsTextArea: LoopItem.IsTextArea
            };
        });
        return LocalReturnObject;
    };
};

module.exports = { AsTreeWithColumns: FuncsWithColumns.AsTreeWithColumns };