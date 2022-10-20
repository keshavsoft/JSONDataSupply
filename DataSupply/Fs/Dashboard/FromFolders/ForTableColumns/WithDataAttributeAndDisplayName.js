let path = require("path");
//let CommonFolders = require("../../../Folders/Show");
//let CommonFiles = require("../../../Files/PullData");
let CommonNewItems = require("../../../Config/Folders/Files/Items/PullData/TableColumns/WithDataAttributeAndDisplayName");
let CommonFolders = require("../../../Config/Folders/PullData/getDirectories");
let CommonFiles = require("../../../Config/Folders/Files/PullData/ListFiles");

class FuncsWithColumns {
    static AsTreeWithColumns = async ({ inDataPk }) => {
        let LocalFoldersData = CommonFolders.StartFunc({ inDataPk });
        let LocalFolderObject;
        let LocalReturnObject = {
            Folders: {}
        };

        LocalFoldersData.forEach(async LoopFolderName => {
            LocalReturnObject.Folders[LoopFolderName] = {
                FolderName: LoopFolderName,
                Files: await this.PullFiles({
                    inFilesArray: CommonFiles.StartFunc({ inFolderName: LoopFolderName, inDataPk }),
                    inFolderName: LoopFolderName,
                    inDataPk
                })
            };

            return await LocalFolderObject;
        });

        return await LocalReturnObject;
    };

    static PullFiles = async ({ inFolderName, inFilesArray, inDataPk }) => {
        let LocalReturnObject = {};

        //        console.log("inFilesArray : ", inFilesArray);

        // LocalReturnData = await Promise.all(inFilesArray.map(async LoopFileName => {
        //     let LocalLoopObject = {};
        //     LocalLoopObject.FileName = LoopFileName;
        //     LocalJsonConfig = {
        //         inFolderName,
        //         inJsonFileName: LoopFileName
        //     };
        //     //console.log("LocalJsonConfig----------- : ", LocalJsonConfig);
        //     LocalLoopObject.Item = await CommonItems.StartFunc({
        //         inJsonConfig: LocalJsonConfig,
        //         inDataPk
        //     });

        //     return await LocalLoopObject;
        // }));

        inFilesArray.forEach(async LoopFileName => {
            LocalReturnObject[path.parse(LoopFileName).name] = {
                FileName: LoopFileName,
                Items: await CommonNewItems.RowsAsObjectsWithColumns({
                    inFolderName,
                    inFileNameWithExtension: LoopFileName,
                    inUserPK: inDataPk
                })
            };
        });
        // console.log("LocalReturnObject : ", LocalReturnObject);
        return await LocalReturnObject;
    }
};

module.exports = { AsTreeWithColumns: FuncsWithColumns.AsTreeWithColumns };